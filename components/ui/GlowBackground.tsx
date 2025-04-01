import React from "react";
import { Dimensions } from "react-native";
import {
  Canvas,
  Path,
  LinearGradient,
  vec,
  Skia,
  Group,
} from "@shopify/react-native-skia";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Cel: width 100%, height 40% ekranu
const canvasWidth = screenWidth;
const canvasHeight = screenHeight * 0.4;

// Oryginalny rozmiar SVG
const originalWidth = 375;
const originalHeight = 328;

// Skalowanie w poziomie i pionie (nieproporcjonalne, bo tniemy)
const scaleX = canvasWidth / originalWidth;
const scaleY = canvasHeight / originalHeight;

// SVG path
const d = "M375 241.5C301.8 296.3 94.5 321.667 0 327.5V0H375V241.5Z";
const path = Skia.Path.MakeFromSVGString(d)!;

export default function GlowSkia() {
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: canvasWidth,
        height: canvasHeight,
        zIndex: 1,
      }}
    >
      <Group transform={[{ scaleX }, { scaleY }]}>
        <Path path={path}>
          <LinearGradient
            start={vec(originalWidth / 2, -99)}
            end={vec(originalWidth / 2, originalHeight)}
            colors={["rgba(217,217,217,0)", "rgba(255,255,255,0.15)"]}
          />
        </Path>
      </Group>
    </Canvas>
  );
}
