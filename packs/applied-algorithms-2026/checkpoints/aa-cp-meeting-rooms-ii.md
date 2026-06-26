---
id: aa-cp-meeting-rooms-ii
title: Self-check — Meeting Rooms II
attachedKataId: aa-meeting-rooms-ii
questions:
  - id: q1
    prompt: >-
      In Meeting Rooms II, the min-heap stores end times of rooms already
      allocated. What does the heap top tell you before placing the next
      meeting?
    choices:
      - id: a
        text: The room that becomes free earliest
      - id: b
        text: The meeting with the latest start time
      - id: c
        text: The total number of meetings in the input
      - id: d
        text: The longest meeting duration
    correctChoiceId: a
    explanation: >-
      If the earliest-ending room is free before the next meeting starts, you
      can reuse it. Otherwise every allocated room is still occupied and you
      need another room.
  - id: q2
    prompt: >-
      Why does heap size correspond to the number of rooms allocated by the
      sweep?
    choices:
      - id: a
        text: >-
          Each push allocates or reuses one room; the heap holds one end time
          per allocated room
      - id: b
        text: The heap stores one entry per input interval forever
      - id: c
        text: The heap size equals the number of meetings that have already ended
      - id: d
        text: 'The heap is sorted by start time, so its size is the answer'
    correctChoiceId: a
    explanation: >-
      The sweep keeps the active room pool as end times. Reusing a room removes
      its old end and pushes the new end; needing a new room only pushes. The
      maximum allocated pool size is the room count.
reflections: []
---

