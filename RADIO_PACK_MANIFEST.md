# Radio Pack Manifest

Pack date: 18 July 2026

## Public individual downloads

| Display title | Intake filename | Repository path | Format | Bytes | Duration / dimensions | SHA-256 | Status |
|---|---|---|---:|---:|---:|---|---|
| Kamo. G Radio Voice Note — Clean | `Kamo-clean.m4a` | `assets/downloads/kamo-g-radio-pack/audio/kamo-g-radio-voice-note-clean.m4a` | M4A (AAC-LC) | 427,030 | 45.632 s | `0876a66d50e0d96f0b54e0c0e9d6aa5214941bfb425c0d73b033082a3aade24f` | Approved clean original |
| Kamo. G Radio Voice Note — Explicit | `Kamo-dirty.m4a` | `assets/downloads/kamo-g-radio-pack/audio/kamo-g-radio-voice-note-explicit.m4a` | M4A (AAC-LC) | 607,003 | 64.832 s | `1e121068fb93275ca29196415e35430b4462ba54d5eea4f7d1ed922f2e3ef329` | Approved explicit original |
| Kamo. G — Official Artist Portrait (Original) | `IMG_3830.JPG` | `assets/downloads/kamo-g-radio-pack/photos/kamo-g-official-artist-portrait-original.jpg` | JPEG | 161,725 | 1080 × 1350 | `9862399ac26fba800107a92c48d9806f4e4966b84b5777eb03e1c7d95cfa2006` | Approved original |
| Kamo. G — Press Portrait (Original) | `IMG_3829.JPG` | `assets/downloads/kamo-g-radio-pack/photos/kamo-g-press-portrait-original.jpg` | JPEG | 111,718 | 1080 × 1350 | `2afe7e129baf99fb4e0b3543dcd97b04aa7100aa7d97ce3a74616986019f31a7` | Approved original |

## Complete pack

- File: `assets/downloads/kamo-g-radio-pack/kamo-g-radio-pack-2026-07-18.zip`
- Size: 1,262,796 bytes
- SHA-256: `2402d49b55255f55325c19cefc63c3c611d0d66b5f0e8fd855a59d13ecaa8f21`
- Contents: `kamo-g-radio-pack/audio/` with the two approved original M4As and `kamo-g-radio-pack/photos/` with the two approved original JPEGs listed above
- Integrity: `unzip -t` passed
- Extraction check: each extracted file’s SHA-256 matched the corresponding repository original
- Exclusions: no email, hidden files, transfer metadata, documents, credentials, or temporary files

The two original JPEG members retain EXIF/IPTC/XMP/Photoshop profiles and embedded thumbnails. A targeted metadata review reported no values in the checked GPS, email, artist/creator, copyright, or camera-serial fields; it did not establish that every embedded field is empty. The verified originals were not stripped or modified.

## Audio and documents

- Audio for Radio and DJs: the approved clean and explicit radio voice notes are published as individual original M4A downloads and included in the ZIP.
- Biography and Documents: none published because no approved public files were supplied.
- Artwork: none published because no separately approved cover-art file was supplied.

The clean and explicit identities are client-approved. Both files were preserved byte-for-byte without transcoding, remuxing, trimming, normalization, or metadata changes. Neither M4A is represented as WAV, a lossless master, or a different recording.

## Delivery size decision

The two original M4As, two original JPEGs, and ZIP are reasonably sized for ordinary Git and Netlify delivery. No file approaches GitHub’s 100 MiB hard limit, and no external storage service is currently required. Future large professional audio masters should be reviewed individually before being added; unavailable URLs must remain unset.
