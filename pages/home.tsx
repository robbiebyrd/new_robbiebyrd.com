"use client"

import '@/app/globals.css'
import type { Metadata } from 'next'
import homeStyles from "./home.module.scss"
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { FlyingWordCloud } from '@/components/FlyingWordCloud'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const metadata: Metadata = {
    title: 'RobbieByrd.com',
    description: 'The home of Robbie Byrd.',
}

export default function SkillsPage() {
    const [vidSource, setVidSource] = useState<string>("media/smoke-move-dark.mp4")
    const [vidLoop, setVidLoop] = useState<boolean>(true)
    const [fired, setFired] = useState<boolean>(false)
    const firedLogo = useRef(null);
    const container = useRef(null);

    const handleClick = () => {
        setVidSource("media/xpl.mp4")
        setVidLoop(false)
        setFired(true)
        onClickGood()
    }
    const { contextSafe } = useGSAP({ scope: container });

    const onClickGood = contextSafe(() => {
        gsap.fromTo(firedLogo.current, { opacity: 0, display: "absolute" }, { opacity: 1, color: "#000000", duration: 3.5, delay: 2.5})
    });

    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(() => {
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }, [])

  useLayoutEffect(() => {
    ScrollSmoother.create({
      smooth: 1 // how long (in seconds) it takes to "catch up" to the native scroll position
    });
  }, []);

    return (
        <html lang="en">
        <body className="antialiased">
        <header id={"header"} className={'flex flex-row w-svw h-1/12 fixed bg-transparent'}>
            <img className={'p-2'} src={"img/logo-dark.svg"} />
        </header>
        <div id="smooth-wrapper">
            <div id="smooth-content">

                <div ref={container} style={{ position: fired ? "relative" : "fixed" }} >
                    <div className={"w-svw h-[120vh] absolute top-0 left-0 -z-10 " + homeStyles.fadeBottom}>
                        <video className={"w-[130svw] h-[130svh] object-cover absolute bottom-0"} src={vidSource} autoPlay={true} loop={vidLoop} />
                    </div>
                    {!fired && (
                        <div className="flex flex-row content-center items-end justify-center w-svw h-svh">
                            <picture onClick={handleClick} className={"rotate mb-8"}>
                                <source
                                    srcSet="img/logo-dark.svg"
                                    media="(prefers-color-scheme: dark)"
                                />
                                <img
                                    src="img/logo-light.svg"
                                    alt="RobbieByrd.com"
                                />
                            </picture>
                        </div>
                    )}
                    <div className="flex flex-col content-center items-center justify-center w-svw h-svh opacity-0 " ref={firedLogo}>
                        <div className={"flex flex-col content-center items-center justify-center"}>
                            <h3 className={"-mb-4"}>Hello! I am</h3>
                            <h1 className={"text-8xl tracking-tighter"} style={{color: "#E74655"}}>robbie byrd<span className={"text-3xl"}>,</span></h1>
                            <h3 className={"mt-2"}>pithy quotation here.</h3>
                        </div>
                    </div>
                    <div className={"w-svw h-[150svh] absolute -z-10 " + homeStyles.fadeBottom}>
                        <video className={"w-svw h-[150svh] object-cover absolute bottom-0"}  autoPlay={true} loop={true} src={"media/smoke-still-dark.mp4"} style={{ filter: `invert(${darkMode ? "0" : "1"})`}}>
                        </video>
                        <img className={"w-[100svw] h-[100svh] object-cover absolute bottom-0 " + !darkMode ? "mix-blend-color" : "mix-blend-luminosity opacity-10"} src={"img/yellow-dust.png"} />
                    </div>
                    <div className={"px-8 lg:flex-row flex flex-col content-center items-center justify-center w-svw h-[150svh] " } >
                        <div className={'w-1/2'}>
                            <figure className={"px-16"}>
                                <img className={""} src={"img/mini_me.jpg"} style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5)" }} />
                                <figcaption className={"mt-4"}>My trusty Tandy 1000RL-HD running QuickBASIC, circa 1992</figcaption>
                            </figure>
                        </div>
                        <div className={"flex flex-col gap-8 px-16 w-1/2 content-center items-center justify-center text-center\n"}>
                            <h1 className={"text-6xl"} style={{color: "#a4aa28"}}>i have 20 years of experience</h1>
                            <hr />
                            <h3 className={"text-3xl"}>I&apos;ve seen some things, been around the block, purchased the novelty shirt.</h3>
                            <p>I specialize in Full-Stack development, with an emphasis on systems architecture, platform growth & stability and design systems.</p>
                            <p>My many years in technology include experience in a variety of business categories, technology challenges and novel techniques.</p>
                        </div>
                    </div>
                    <div className={"w-svw h-[150svh] absolute -z-10 " + homeStyles.fadeTopAndBottom}>
                        <video style={{ filter: `invert(${darkMode ? "1" : "0"})`}} className={"w-svw h-[150svh] object-cover absolute bottom-0"}  autoPlay={true} loop={true} src={"media/smoke-still-dark.mp4"} />
                        <img className={"w-[100svw] h-[100svh] object-fill absolute bottom-0 " + !darkMode ? "mix-blend-color" : "mix-blend-luminosity opacity-10"} src={"img/yellow-dust.png"} />
                    </div>
                    <div className={"h-8"}></div>
                    <div className="flex flex-col content-center items-center justify-center w-svw h-[110svh] text-center">
                        <h1 className={"text-6xl mb-4 w-8/12"} style={{color: "#E74655"}}>i&apos;ve worked with some amazing brands</h1>
                        <hr />
                        <FlyingWordCloud className={"w-full h-1/4 font-light"}
                                         items={["Hallmark", "Shawn Mendes", "Texas Lottery Commission", "Level Home", "Vitalant", "Taco Bell", "Willie Nelson", "Whole Foods Market", "Radiohead", "The Who"]} />
                    </div>
                </div>
            </div>
        </div>
        </body>
        </html>
    )
}
