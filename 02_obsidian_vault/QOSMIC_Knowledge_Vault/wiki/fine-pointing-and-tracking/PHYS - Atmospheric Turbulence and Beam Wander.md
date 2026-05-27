---
type: physics_concept
status: reviewed
concept_area: atmospheric-optics
owner: controls-and-optics
explains:
  - "[[REQ - Reject Platform Jitter and Beam Wander]]"
justifies:
  - "[[DD - Set FSM Bandwidth Target Near 400 Hz]]"
references:
  - "[[REF - Adaptive Optics and Atmospheric Turbulence Literature]]"
---

# PHYS - Atmospheric Turbulence and Beam Wander

## Summary

Atmospheric turbulence can disturb the received optical beam, causing motion, scintillation, and wavefront distortion at the receiver.

## Concept Explanation

As an optical signal passes through the atmosphere, variations in refractive index can disturb the beam. One practical effect for ground-station design is beam wander, where the apparent beam position moves at the receiver plane. This can reduce coupling efficiency and link stability.

## Why It Matters for QOSMIC

A LEO optical link already has tight pointing requirements. Atmospheric beam motion adds another dynamic disturbance that the ground station must tolerate or correct. This is one reason the fine pointing loop cannot be treated as optional.

## Design Implications

- Site-specific turbulence measurements matter.
- Fine pointing requirements should be derived from measured disturbance spectra.
- Adaptive optics may be relevant later, but early systems still need fast pointing correction.
- The FSM bandwidth target should be validated, not treated as fixed forever.

## Related Requirements

- [[REQ - Reject Platform Jitter and Beam Wander]]
- [[REQ - Maintain Fine Pointing Stability]]

## Related Design Decisions

- [[DD - Set FSM Bandwidth Target Near 400 Hz]]
- [[DD - Separate Coarse and Fine Pointing Loops]]

## References

- [[REF - Adaptive Optics and Atmospheric Turbulence Literature]]