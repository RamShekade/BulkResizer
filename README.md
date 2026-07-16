# Bulk Image Resizer

A browser-based tool to upload multiple images, resize them in bulk, and download everything as a ZIP — fast and private.

visit -  [https://bulk-resizer-aamd.vercel.app/](https://bulk-resizer-aamd.vercel.app/)

## Idea

Users pick many images at once, set resize options (by percentage or pixels), preview the new dimensions, then export all resized files in one click. No accounts, no waiting on a server.

## Why Frontend Only?

- **Privacy** — Images stay on the user's device; nothing is uploaded
- **Speed** — Resize runs locally with the Canvas API
- **Simplicity** — No backend, database, or storage to maintain
- **Cost** — No server bills for image processing



## Architecture (Short)

```
Upload (/) → ImageContext (state) → Dashboard (/dashboard)
                ↓
         getSize utils (dimensions)
                ↓
    useResizeImages (Canvas + JSZip) → download ZIP
```


| Piece                    | Role                            |
| ------------------------ | ------------------------------- |
| `app/page.tsx`           | Upload & drag-and-drop          |
| `app/dashboard/page.tsx` | Image grid + resize controls    |
| `ImageContext`           | Holds uploaded images in memory |
| `getSize.ts`             | Calculates target width/height  |
| `useResizeImages`        | Resizes via canvas, bundles ZIP |
| `ImageCard`              | Preview original → resized size |


**Stack:** Next.js · React · TypeScript · Tailwind CSS

## Work To Do

- [ ] Fix percentage logic / UX (clarify “reduce by” vs “resize to”)
- [ ] Rename `useResizeImgages.ts` → `useResizeImages.ts`
- [ ] Add image format options (JPEG quality, PNG/WebP)
- [ ] Show estimated output file size before download
- [ ] Progress indicator for large batches
- [ ] “Download individual image” option
- [ ] Mobile-friendly layout for dashboard sidebar
- [ ] Error handling for unsupported/corrupt images



## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)