import classNames from 'classnames'
import React from "react";
import Marquee from "react-fast-marquee";
import "./FlyingWordCloud.scss";


type FlyingWordCloudProps = {
    className?: string;
    items: string[]

}

export const FlyingWordCloud: React.FC<FlyingWordCloudProps> = (props: FlyingWordCloudProps) => {
    function shuffleItems(a: string[]) {
        let c = a.length,
            r;

        while (c > 0) {
            r = Math.floor(Math.random() * c);
            c--;

            [a[c], a[r]] = [a[r], a[c]];
        }

        return a;
    }

    const itemsShuffled = shuffleItems(props.items);
    const classSizeMaps = [ "text-4xl", "text-3xl", "text-5xl"];
    const colorMaps = [ "#9e3f3f", "#ff6666", "#ff2b2b" ];
    return (
        <div className={props.className}>
            {itemsShuffled.map((word, i) => (
                <Marquee
                    key={i}
                    speed={Math.floor(Math.random() * 100) }
                    style={{
                        width: "100%",
                        position: "absolute",
                    }}
                    delay={Math.floor(Math.random() * 10)}
                    direction={i % 2 ? "left" : "right"}
                >
                    <h2 style={{
                        animationName: "faded",
                        animationDirection: "alternate",
                        animationIterationCount: "infinite",
                        animationDuration:
                            Math.floor(Math.random() * (10 - 5 + 1) + 5) + "s",
                        marginTop:
                            "" + Math.floor(Math.random() * (100 - 20 + 1) + 20) + "%",
                        marginLeft:
                            "" + Math.floor(Math.random() * (100 - 20 + 1) + 20) + "%",
                        color: colorMaps[i % classSizeMaps.length]
                    }}
                        className={classNames(
                            String(classSizeMaps[i % classSizeMaps.length]),
                        )}
                    >
                        {word}
                    </h2>
                </Marquee>
            ))}
        </div>
    );
};
