---
type: requirement
status: canonical
requirement_id: REQ-OPT-002
priority: high
owner: systems-engineering
verification_method: receiver throughput test
source: optical downlink service requirement
derived_decisions:
  - "[[DD - Use Fiber-Coupled Optical Receiver Architecture]]"
tested_by:
  - receiver chain throughput test
---

# REQ - Support High-Rate Downlink Capture

## Summary

The receiver chain must support high-rate satellite downlink capture without creating a bottleneck after optical collection.

## Requirement Statement

The optical receiver subsystem should preserve enough optical signal quality and downstream data throughput to support high-rate LEO satellite downlinks.

## Why This Requirement Exists

Optical ground stations are valuable because they can support much higher data rates than many conventional RF links. If the optical receiver or downstream interface becomes the bottleneck, the station loses one of its core advantages.

## Acceptance Criteria

- Receiver path preserves sufficient signal-to-noise ratio.
- Downstream electronics can process the expected data rate.
- Storage and backhaul systems can buffer and transfer captured pass data.
- Losses in fiber coupling and receiver alignment remain within system budget.

## Verification Method

Receiver chain throughput test and end-to-end pass simulation.

## Related Design Decisions

- [[DD - Use Fiber-Coupled Optical Receiver Architecture]]
- [[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]

## Open Questions

- What data rate is required for the first satellite downlink demonstration?
- What margin is required above expected customer throughput?