# Image Optimization

Good image optimization keeps the site fast while preserving photo quality. Below are recommended settings and commands.

Recommendations
- Target resolution: up to **1920×1080** for large displays; serve smaller variants for mobile.
- JPEG quality: **75–85** for good visual quality / file size tradeoff.
- Convert to `WebP` for additional savings where supported.
- Use `lazy` loading for `<img loading="lazy">` to defer off-screen images.

Tools & example commands

1) ImageMagick (convert & resize)
```powershell
# Resize and strip metadata (PowerShell):
magick "input.jpg" -strip -resize 1600x1600^> -quality 85 "output.jpg"
```

2) jpegoptim (lossy optimization)
```powershell
jpegoptim --max=85 --strip-all *.jpg
```

3) cwebp (convert to WebP)
```powershell
cwebp -q 80 input.jpg -o output.webp
```

Batch PowerShell example
```powershell
Get-ChildItem -Path .\images -Include *.jpg -Recurse | ForEach-Object {
  $in = $_.FullName
  $out = Join-Path $_.DirectoryName ("opt_" + $_.Name)
  magick $in -strip -resize 1600x1600^> -quality 82 $out
}
```

Responsive images
- Consider generating multiple sizes and using `srcset` and `sizes` attributes to let browsers pick the best file.

Lazy loading
- Add `loading="lazy"` on `<img>` elements or use an intersection-observer-based script for older browsers.

When to use Git LFS
- If you store many originals or very large files (multi-megabyte originals), consider Git LFS to avoid bloating the repo.

Resources
- ImageMagick: https://imagemagick.org
- cwebp: https://developers.google.com/speed/webp
- jpegoptim: https://github.com/tjko/jpegoptim
