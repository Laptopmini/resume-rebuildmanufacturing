Fixed lint errors in both About.tsx and Stats.tsx by:
- Replacing string concatenation with template literals for duration values
- Changing array index key to stat.label in Stats.tsx

All four template literal errors and the noArrayIndexKey error should now be resolved.
