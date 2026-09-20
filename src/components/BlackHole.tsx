import React, { useRef, useEffect } from 'react';

interface BlackHoleProps {
  className?: string;
  intensity?: number;
  scale?: number;
  speed?: number;
  interactive?: boolean;
}

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_intensity;
uniform float u_scale;
uniform float u_speed;

varying vec2 v_uv;

#define PI 3.14159265359

mat2 rot(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, -s, s, c);
}

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = rot(0.5);
    for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = m * p * 2.02 + vec2(0.12, 0.23);
        a *= 0.5;
    }
    return v;
}

void main() {
    // Screen UV normalized to center
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
    uv /= max(0.2, u_scale);
    
    // Interactive mouse parallax tilt
    vec2 mouseOffset = (u_mouse - 0.5) * 0.3;
    
    // Camera ray setup (tuned for majestic Gargantua framing)
    float camDist = 3.5;
    float pitch = 0.25 + mouseOffset.y * 0.25;
    float yaw = mouseOffset.x * 0.35;
    
    vec3 ro = vec3(0.0, camDist * sin(pitch), -camDist * cos(pitch));
    ro.xz = rot(yaw) * ro.xz;
    
    vec3 target = vec3(0.0, 0.0, 0.0);
    vec3 fwd = normalize(target - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);
    
    float fov = 1.15;
    vec3 rd = normalize(fwd * fov + right * uv.x + up * uv.y);
    
    vec3 pos = ro;
    vec3 dir = rd;
    
    float r_horizon = 0.26;
    float r_shadow = 0.38;
    float r_in = 0.44;
    float r_out = 2.15;
    
    vec3 accColor = vec3(0.0);
    float accAlpha = 0.0;
    bool hitHole = false;
    float min_r = 100.0;
    
    // 64-step volumetric curved spacetime raymarching
    const int STEPS = 64;
    float stepSize = 0.08;
    
    for (int i = 0; i < STEPS; i++) {
        float r = length(pos);
        min_r = min(min_r, r);
        
        if (r < r_horizon) {
            hitHole = true;
            break;
        }
        
        if (r > 6.5 && dot(pos, dir) > 0.0) {
            break;
        }
        
        // Volumetric Accretion Disk density sampling
        float r_disk = length(pos.xz);
        if (r_disk >= r_in && r_disk <= r_out) {
            float sigma = 0.038 + 0.024 * (r_disk - r_in);
            float vert = exp(- (pos.y * pos.y) / (2.0 * sigma * sigma));
            float rad = smoothstep(r_in, r_in + 0.12, r_disk) * smoothstep(r_out, r_out - 0.50, r_disk);
            
            if (vert * rad > 0.001) {
                float angle = atan(pos.z, pos.x);
                float omega = 2.4 / pow(r_disk, 1.15);
                float animAngle = angle + u_time * omega * u_speed;
                
                vec2 polar = vec2(r_disk * 5.8, animAngle * 3.0);
                float n1 = fbm(polar - vec2(u_time * 0.4 * u_speed, 0.0));
                float plasma = smoothstep(0.1, 0.9, n1);
                
                float density = vert * rad * (0.35 + 0.65 * plasma);
                
                // Relativistic Doppler Beaming
                float v_los = sin(angle) * (0.75 / sqrt(r_disk));
                float doppler = clamp(1.0 + v_los * 1.6, 0.25, 3.2);
                
                // Color palette: Core White -> Cyan (#38BDF8) -> Indigo (#6366F1) -> Violet (#8B5CF6)
                vec3 c_core   = vec3(0.96, 0.98, 1.0);
                vec3 c_cyan   = vec3(0.22, 0.74, 0.98);
                vec3 c_indigo = vec3(0.39, 0.40, 0.96);
                vec3 c_violet = vec3(0.68, 0.25, 0.95);
                vec3 c_edge   = vec3(0.12, 0.04, 0.30);
                
                float norm_r = (r_disk - r_in) / (r_out - r_in);
                vec3 diskColor = mix(c_core, c_cyan, smoothstep(0.0, 0.20, norm_r));
                diskColor = mix(diskColor, c_indigo, smoothstep(0.20, 0.55, norm_r));
                diskColor = mix(diskColor, c_violet, smoothstep(0.55, 0.85, norm_r));
                diskColor = mix(diskColor, c_edge, smoothstep(0.85, 1.0, norm_r));
                
                diskColor *= pow(doppler, 1.65);
                
                float stepWeight = density * stepSize * 25.0;
                accColor += diskColor * stepWeight * (1.0 - accAlpha);
                accAlpha += stepWeight * (1.0 - accAlpha);
                if (accAlpha >= 0.98) break;
            }
        }
        
        // Schwarzschild Gravitational Lensing Deflection Force
        float force = 1.55 / (r * r * r + 0.001);
        vec3 accel = -normalize(pos) * force;
        
        dir = normalize(dir + accel * stepSize);
        pos += dir * stepSize;
        stepSize = clamp(r * 0.068, 0.02, 0.095);
    }
    
    // Intense Einstein Photon Ring Glow
    if (!hitHole) {
        float ringDist = abs(min_r - 0.34);
        float ring = exp(-ringDist * 40.0) * 3.6;
        vec3 ringCol = vec3(0.72, 0.94, 1.0) * ring;
        accColor += ringCol * (1.0 - accAlpha * 0.5);
    }
    
    // Ambient Gravitational Corona Glow
    float corona = 0.055 / (min_r * min_r + 0.03);
    vec3 coronaCol = mix(vec3(0.22, 0.65, 1.0), vec3(0.68, 0.25, 0.98), smoothstep(0.2, 1.2, min_r)) * corona;
    accColor += coronaCol * (1.0 - accAlpha * 0.4);
    
    // Warped Deep-Space Starfield & Cosmic Nebula
    if (!hitHole && accAlpha < 0.96) {
        vec2 bgCoord = dir.xy / (dir.z + 2.0);
        float starNoise = hash(floor(bgCoord * 150.0));
        float star = pow(starNoise, 48.0) * 4.8;
        vec3 starCol = vec3(0.85, 0.95, 1.0) * star;
        
        float nebula = fbm(bgCoord * 2.8 + vec2(0.2, 0.4)) * 0.25;
        vec3 nebulaCol = mix(vec3(0.04, 0.12, 0.32), vec3(0.22, 0.06, 0.38), fbm(bgCoord * 1.5)) * nebula;
        
        accColor += (starCol + nebulaCol) * (1.0 - accAlpha);
    }
    
    // Event Horizon Absolute Black Shadow
    if (hitHole || min_r < r_shadow) {
        float shadow = smoothstep(r_shadow * 0.90, r_shadow * 1.06, min_r);
        accColor *= shadow;
    }
    
    // Deep space dark theme base color (#07090E)
    vec3 spaceBg = vec3(0.027, 0.035, 0.055);
    
    // Radial Vignette for smooth edge fade
    float d = length(uv);
    float vignette = smoothstep(1.75, 0.45, d);
    
    // Color grading & tonemapping (Reinhard)
    vec3 finalCol = accColor * u_intensity;
    finalCol = mix(spaceBg, finalCol + spaceBg, vignette);
    
    finalCol = finalCol / (finalCol + vec3(0.82));
    finalCol = pow(finalCol, vec3(0.92));
    
    gl_FragColor = vec4(finalCol, 1.0);
}
`;

export const BlackHole: React.FC<BlackHoleProps> = ({
  className = '',
  intensity = 1.0,
  scale = 1.0,
  speed = 1.0,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let prefersReducedMotion = false;
    if (typeof window !== 'undefined') {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    const gl = (canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    }) ||
      canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }) ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) {
      console.warn('WebGL is not supported on this device/browser.');
      return;
    }

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPositionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const uIntensityLoc = gl.getUniformLocation(program, 'u_intensity');
    const uScaleLoc = gl.getUniformLocation(program, 'u_scale');
    const uSpeedLoc = gl.getUniformLocation(program, 'u_speed');

    let animationFrameId: number;
    let isVisible = true;
    let startTime = performance.now();
    let currentMouseX = 0.5;
    let currentMouseY = 0.5;
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;

    const handleResize = () => {
      if (!canvas || !container) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(width * dpr);
      const displayHeight = Math.floor(height * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        targetMouseX = Math.max(0, Math.min(1, x));
        targetMouseY = Math.max(0, Math.min(1, y));
      }
    };

    if (interactive) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    const render = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const elapsed = prefersReducedMotion 
        ? 0.5 
        : (currentTime - startTime) * 0.001;

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, currentMouseX, currentMouseY);
      gl.uniform1f(uIntensityLoc, intensity);
      gl.uniform1f(uScaleLoc, scale);
      gl.uniform1f(uSpeedLoc, speed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', handlePointerMove);
      }

      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vertShader);
        gl.deleteShader(fragShader);
      }
    };
  }, [intensity, scale, speed, interactive]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};
