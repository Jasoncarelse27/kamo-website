# Kamo Website Recovery Manifest

Recovery date: 2026-07-16  
Clean base: `d1c20d826c62b6671c171e590386754f94ca5f2c`  
Recovery branch: `recovery/kamo-handover-20260716`

## Comparison result

The verified preservation mirror was compared with the clean clone using checksum-aware `rsync`, deterministic SHA-256 manifests, and path inventories. All 49 ordinary project files in the clean base and preservation mirror have identical content. No unpublished HTML, CSS, JavaScript, JSON, configuration, document, or image bytes required recovery.

Timestamp-only differences were not copied because file contents were identical. The damaged Git index was not used during comparison.

## Differences

| Relative path | Clean-base state | Preserved-tree state | Classification | Action | Reason |
|---|---|---|---|---|---|
| `kamo-site.zip` | Absent | Present; SHA-256 `59d645b4242102dcd88b021a02b9c23a5a876bace237e94da6b8374c28e4cb67` | Generated/local file | Excluded | Generated snapshot containing duplicate project files and editor-history data; it is not unpublished source. |
| `assets/downloads/` | Absent | Empty directory | Generated/local file | Excluded | No recoverable file content; Git does not track empty directories. |
| `assets/fonts/` | Absent | Empty directory | Generated/local file | Excluded | No recoverable file content; Git does not track empty directories. |
| `assets/images/hero/` | Absent | Empty directory | Generated/local file | Excluded | No recoverable file content; Git does not track empty directories. |
| `lib/` | Absent | Empty directory | Generated/local file | Excluded | No recoverable file content; Git does not track empty directories. |
| `.history/**` | Absent | 99 editor-history files | Generated/local file | Excluded | Local editor history, not authoritative project source. |
| `.dboc/engineering-journal.log` | Absent | Present | Generated/local file | Excluded | Local tool journal; not website source. |
| `assets/images/.DS_Store` | Absent | Present | Generated/local file | Excluded | macOS metadata. |
| `.git/**` including `.git/index.lock` | Fresh clone metadata | Damaged repository metadata | Damaged Git metadata | Excluded | The clean clone must never inherit the missing index or stale lock. |

## Recovery action

No preserved project file was copied because the clean base already contains the exact project bytes. The recovery checkpoint consists only of this auditable manifest.
