# Natural Text Command Format

## Feeding
```text
수유기록 <양>ml <분유|모유|혼합> [HH:mm] [메모]
```

Examples:
- `수유기록 120ml 분유`
- `수유기록 120ml 분유 16:30`
- `수유기록 120ml 분유 16:30 잠결수유`

## Diaper
```text
기저귀기록 <소변|대변|대소변> [HH:mm] [메모]
```

## Bath
```text
목욕기록 [HH:mm] [메모]
```

## Notes
- Human-readable first
- HomeBot parses this text and converts it into monthly baby logs
- Time defaults to message received time when omitted
