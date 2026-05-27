---
type: component
status: draft
vendor: TBD
part_number: TBD
estimated_cost: TBD after RFQ
lead_time: TBD after RFQ
datasheet: TBD
used_in:
  - "[[SUBSYS - Fine Pointing and Tracking]]"
implements:
  - "[[DD - Separate Coarse and Fine Pointing Loops]]"
risks:
  - latency
  - sensitivity
  - frame-rate limitation
---

# COMP - Candidate Tracking Camera

## Summary

The tracking camera senses residual beam or target position error and provides feedback to the fine pointing control loop.

## Function

The tracking camera allows the system to estimate pointing error after coarse tracking. Its measurements feed the control loop that drives the fast steering mirror.

## Candidate Specifications

- Frame rate compatible with fine pointing loop design
- Low latency readout
- Sufficient sensitivity for expected signal levels
- Integration with real-time control software
- Stable calibration procedure

## Vendor and Procurement Notes

Vendor selection should consider sensor latency, frame rate, sensitivity, software support, SDK maturity, and integration difficulty.

## Implements

- [[DD - Separate Coarse and Fine Pointing Loops]]

## Risks

- Camera latency may limit control bandwidth.
- Insufficient sensitivity can affect lock reliability.
- SDK or driver instability can delay integration.
- Calibration drift may reduce pointing accuracy.

## Alternatives

- Quadrant photodiode
- Position-sensitive detector
- Higher-speed industrial camera
- Dedicated tracking sensor module

## References

- [[REF - Adaptive Optics and Atmospheric Turbulence Literature]]