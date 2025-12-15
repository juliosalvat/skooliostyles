# Model Replacement Documentation

## Session Summary
This document details the process of replacing a 3D model in a Three.js React application and adjusting its display parameters.

## Files Modified
- `/src/components/canvas/Leap.jsx`

## Changes Made

### 1. Model Replacement
- Original model: `./leap/Leap.gltf`
- New model: `./arms/arms.gltf`
- The new model file was added to the public folder at path: `public/arms/arms.gltf`

### 2. Model Transformation Adjustments

#### Scale Changes
- Initial scale: `0.7` (mobile) / `0.75` (desktop)
- First adjustment: `2.5` (mobile) / `3.5` (desktop)
- Second adjustment (4x increase): `10` (mobile) / `14` (desktop)
- Final scale: `8` (mobile) / `11` (desktop)

#### Position Changes
- Initial position: `[0, -3, -2.2]` (mobile) / `[0, -3.25, -1.5]` (desktop)
- Centered position: `[0, 0, 0]`
- Lowered position: `[0, -2, 0]`
- Final position: `[0, -0.7, 0]`

#### Rotation Changes
- Initial rotation: `[-0.01, Math.PI / 2.8, -0.1]`
- Final rotation: `[0, 0, 0]` (centered rotation axis)

### 3. Lighting System Overhaul

#### Original Lighting Configuration
- Spotlights positioned directly above, below, in front, left, and right at 50 unit distances
- Basic directional lighting setup

#### New Lighting Configuration
- Repositioned all spotlights for more dynamic 3D lighting
- Added backlight for better coverage behind the model
- Adjusted light intensities for balanced illumination
- Final intensity values (after 25% reduction):
  - Hemisphere light: 0.225
  - Point light: 0.3
  - Spotlight above: 0.375
  - Spotlights behind/front: 0.45
  - Spotlights left/right: 0.3

#### Spotlight Positions
- Above: `[10, 20, 10]`
- Behind: `[0, 10, -25]`
- Front: `[0, 5, 25]`
- Left: `[-20, 10, 10]`
- Right: `[20, -5, 15]`

## Technical Notes

### Model Loading
The model is loaded using the `useGLTF` hook from `@react-three/drei` with DRACO compression support for optimized loading.

### Responsive Design
The component maintains separate scale values for mobile and desktop viewports, with mobile detection handled via media query for screens under 500px width.

### Performance Considerations
- Frame loop set to "demand" for optimized rendering
- Memoized model component to prevent unnecessary re-renders
- Shadow mapping enabled with 1024 resolution for quality shadows

## Export Process from ZBrush
For future reference, the recommended workflow for exporting models from ZBrush to GLTF format:

1. Export from ZBrush as OBJ or FBX format
2. Import into Blender (free 3D software)
3. Export from Blender as GLTF 2.0 or GLB (binary format)
4. Optional: Use online converters or command-line tools like obj2gltf for direct conversion
5. Optimize polycount using ZBrush's Decimation Master before export for better web performance

## Result
Successfully replaced the Leap model with the arms model, centered it on screen with proper scaling and rotation pivot, and improved the lighting system for better visibility from all angles.