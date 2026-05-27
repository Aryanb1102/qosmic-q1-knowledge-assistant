---
type: subsystem
status: canonical
owner: controls-and-optics
last_reviewed: 2026-01-15
related_requirements:
  - "[[REQ - Maintain Fine Pointing Stability]]"
  - "[[REQ - Reject Platform Jitter and Beam Wander]]"
related_design_decisions:
  - "[[DD - Separate Coarse and Fine Pointing Loops]]"
  - "[[DD - Set FSM Bandwidth Target Near 400 Hz]]"
related_components:
  - "[[COMP - Candidate Fast Steering Mirror]]"
  - "[[COMP - Candidate Tracking Camera]]"
related_physics:
  - "[[PHYS - Atmospheric Turbulence and Beam Wander]]"
  - "[[PHYS - Pointing Error and Optical Link Margin]]"
references:
  - "[[REF - Adaptive Optics and Atmospheric Turbulence Literature]]"
---

# SUBSYS - Fine Pointing and Tracking

## Summary

The fine pointing and tracking subsystem keeps the incoming optical beam aligned with the receiver path during a LEO satellite pass. It works alongside the coarse telescope mount but corrects faster residual disturbances that the large mount cannot handle alone.

This subsystem is critical because optical communication links are highly sensitive to pointing error. Even if the telescope collects enough light, poor pointing can reduce coupling efficiency and damage the link margin.

## Role in the Ground Station

The coarse mount follows the satellite’s large angular motion across the sky. The fine pointing subsystem handles faster and smaller disturbances, including residual mount jitter, platform vibration, and beam movement caused by atmospheric effects.

The subsystem is connected to:

- [[SUBSYS - Telescope and Optical Receiver]]
- [[REQ - Maintain Fine Pointing Stability]]
- [[REQ - Reject Platform Jitter and Beam Wander]]
- [[PHYS - Atmospheric Turbulence and Beam Wander]]
- [[PHYS - Pointing Error and Optical Link Margin]]

## Key Requirements

- [[REQ - Maintain Fine Pointing Stability]]
- [[REQ - Reject Platform Jitter and Beam Wander]]

These requirements exist because high-rate optical links have narrow pointing tolerances. The system must maintain beam alignment not only in a static sense, but throughout a dynamic satellite pass.

## Major Design Decisions

- [[DD - Separate Coarse and Fine Pointing Loops]]
- [[DD - Set FSM Bandwidth Target Near 400 Hz]]

The separation between coarse and fine pointing prevents the telescope mount from being forced to correct disturbances outside its practical response range. The FSM bandwidth target is treated as a design assumption that must be validated against measured disturbance spectra, actuator limits, and closed-loop testing.

## Major Components

- [[COMP - Candidate Fast Steering Mirror]]
- [[COMP - Candidate Tracking Camera]]

These components implement the sensing and correction loop. The tracking camera detects residual beam position error, while the FSM provides high-speed angular correction.

## Dependencies

Fine pointing depends on the telescope and receiver architecture because the acceptable pointing error is determined by the optical path, detector geometry, fiber coupling architecture, and link-budget margin.

Key dependency:

- [[SUBSYS - Telescope and Optical Receiver]]

## Open Questions

- What is the measured disturbance spectrum at the site and on the telescope mount?
- What correction bandwidth is required after separating coarse and fine pointing loops?
- What actuator resonance and control stability limits constrain the FSM?
- How should the system degrade if the tracking camera loses lock during a pass?

## Links

- derives-from: [[REQ - Maintain Fine Pointing Stability]], [[REQ - Reject Platform Jitter and Beam Wander]]
- justified-by: [[PHYS - Atmospheric Turbulence and Beam Wander]], [[PHYS - Pointing Error and Optical Link Margin]]
- depends-on: [[SUBSYS - Telescope and Optical Receiver]]
- implemented-by: [[COMP - Candidate Fast Steering Mirror]], [[COMP - Candidate Tracking Camera]]
- references: [[REF - Adaptive Optics and Atmospheric Turbulence Literature]]