"use client"

import { useEffect, useRef } from "react"

interface BackgroundAnimationProps {
  animationType: string
  speed: string
  backgroundColor: string
}

export default function BackgroundAnimation({ 
  animationType, 
  speed, 
  backgroundColor 
}: BackgroundAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    
    const speedMultiplier = speed === "slow" ? 0.5 : speed === "fast" ? 2 : 1

    if (animationType === "stars") {
      const stars: Array<{
        x: number
        y: number
        radius: number
        vx: number
        vy: number
        opacity: number
      }> = []

      
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          vx: (Math.random() - 0.5) * 0.5 * speedMultiplier,
          vy: (Math.random() - 0.5) * 0.5 * speedMultiplier,
          opacity: Math.random() * 0.8 + 0.2,
        })
      }

      const animate = () => {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        stars.forEach((star) => {
          star.x += star.vx
          star.y += star.vy

          
          if (star.x < 0) star.x = canvas.width
          if (star.x > canvas.width) star.x = 0
          if (star.y < 0) star.y = canvas.height
          if (star.y > canvas.height) star.y = 0

          
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
          ctx.fill()

          
          if (Math.random() < 0.01) {
            star.opacity = Math.random() * 0.8 + 0.2
          }
        })

        requestAnimationFrame(animate)
      }

      animate()
    } else if (animationType === "particles") {
      const particles: Array<{
        x: number
        y: number
        radius: number
        vx: number
        vy: number
        opacity: number
        color: string
      }> = []

      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 2 * speedMultiplier,
          vy: (Math.random() - 0.5) * 2 * speedMultiplier,
          opacity: Math.random() * 0.6 + 0.2,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        })
      }

      const animate = () => {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy

          
          if (particle.x < 0) particle.x = canvas.width
          if (particle.x > canvas.width) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height
          if (particle.y > canvas.height) particle.y = 0

          
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, "0")
          ctx.fill()
        })

        requestAnimationFrame(animate)
      }

      animate()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [animationType, speed, backgroundColor])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: backgroundColor }}
    />
  )
}
