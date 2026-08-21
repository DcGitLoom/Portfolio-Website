"use client";

import { useEffect, useRef } from "react";

/**
 * Technical Pulse Grid: a procedural background of scanning grid lines that
 * brighten around the cursor.
 *
 * The canvas is viewport-sized and fixed rather than stretched over the whole
 * document, so cost stays constant no matter how tall the page grows. It fades
 * in only once the hero has scrolled away, which is why the hero keeps its own
 * look untouched.
 */

const VERT = `#version 100
precision highp float;
attribute vec2 a_pos;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `#version 100
precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

varying vec2 v_texCoord;

const vec3  BG        = vec3(0.02, 0.05, 0.03);   // near-black forest green
const vec3  LINE      = vec3(0.102, 0.902, 0.2);  // #1ae633
const float GRID      = 20.0;
// Measured in cell fractions, so the on-screen width is THICKNESS * cell size.
// At 0.012 a ~45px cell renders a half-pixel line that anti-aliasing erases.
const float THICKNESS = 0.03;

// Distance to the nearest grid line, in cell space.
float gridLines(vec2 uv) {
  vec2 f = fract(uv * GRID);
  vec2 d = min(f, 1.0 - f);
  float line = min(d.x, d.y);
  // smoothstep keeps the 1px lines from aliasing into dashes while scrolling
  return 1.0 - smoothstep(0.0, THICKNESS, line);
}

void main() {
  // Correct for aspect so cells stay square rather than stretching with width.
  vec2 uv = v_texCoord;
  uv.x *= u_resolution.x / u_resolution.y;

  float lines = gridLines(uv);

  // Vertical scan: opacity is modulated by time and the cell's Y position, so
  // the grid reads as being swept by a light source rather than blinking.
  float scan = 0.5 + 0.5 * sin(u_time * 0.9 - uv.y * GRID * 0.55);
  float pulse = mix(0.25, 1.0, scan);

  // Cursor glow, in the same aspect-corrected space as the grid.
  vec2 m = u_mouse;
  m.x *= u_resolution.x / u_resolution.y;
  float glow = 1.0 - smoothstep(0.0, 0.3, distance(uv, m));

  // Toned down from the first pass: at full brightness the lines cut across
  // body text wherever a section has no opaque card behind it, especially
  // where the font is thin (font-light headings, muted prose). The grid
  // still reads as a moving pattern, just as a texture behind content
  // instead of a layer competing with it.
  float intensity = lines * (pulse * 0.20 + glow * 0.35);
  vec3 color = BG + LINE * intensity;

  // Soft vignette so the grid never competes with text at the edges.
  float vig = 1.0 - 0.52 * length(v_texCoord - 0.5);
  gl_FragColor = vec4(color * vig, 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("PulseGrid shader:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function PulseGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    // No WebGL (older device, blocked context): leave the plain background.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("PulseGrid link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // Cap DPR: at 3x this shader is fill-rate bound for no visible gain.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Target in normalised space; the rendered position eases toward it so the
    // glow trails the cursor instead of snapping.
    const target = { x: 0.5, y: 0.5 };
    const eased = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight; // GL origin is bottom-left
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The hero keeps its own treatment, so the grid only fades up once the hero
    // has left the viewport. Opacity is driven here rather than by unmounting,
    // so the WebGL context is created once and never thrashed.
    const hero = document.getElementById("home");
    let io: IntersectionObserver | null = null;
    if (hero) {
      io = new IntersectionObserver(
        ([entry]) => {
          canvas.style.opacity = entry.isIntersecting ? "0" : "1";
        },
        { threshold: 0.15 },
      );
      io.observe(hero);
    } else {
      canvas.style.opacity = "1";
    }

    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = () => {
      if (!running) return;
      eased.x += (target.x - eased.x) * 0.08;
      eased.y += (target.y - eased.y) * 0.08;
      gl.uniform2f(uMouse, eased.x, eased.y);
      // Reduced motion: hold a fixed phase so the grid is present but still.
      gl.uniform1f(uTime, reduced ? 2.0 : (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    frame();

    // Stop drawing when the tab is hidden; nothing is watching it.
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        frame();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-0 transition-opacity duration-700"
    />
  );
}
