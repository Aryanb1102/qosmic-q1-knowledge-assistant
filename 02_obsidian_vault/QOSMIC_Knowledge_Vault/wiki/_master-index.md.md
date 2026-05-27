# QOSMIC Knowledge Graph - Master Index

## Purpose

This vault is a prototype organizational knowledge graph for QOSMIC's optical ground station engineering work. It is designed to preserve design rationale, reduce onboarding friction, and allow AI-assisted querying with citations.

The vault is structured around engineering decisions rather than loose documentation. Each major design decision is linked to the requirement it derives from, the physics concept that justifies it, the component that implements it, and the reference or test that supports it.

## Subsystem Indexes

### Telescope and Optical Receiver

- [[SUBSYS - Telescope and Optical Receiver]]
- [[DD - Use Ritchey-Chretien Telescope for Primary Receiver]]
- [[DD - Use Fiber-Coupled Optical Receiver Architecture]]
- [[REQ - Maintain Optical Link During LEO Pass]]
- [[REQ - Support High-Rate Downlink Capture]]
- [[PHYS - Diffraction Link Budget and Aperture Size]]
- [[PHYS - Fiber Coupling Efficiency]]
- [[COMP - Candidate 50cm Telescope Assembly]]
- [[REF - Optical Ground Station Design Literature]]

### Fine Pointing and Tracking

- [[SUBSYS - Fine Pointing and Tracking]]
- [[DD - Separate Coarse and Fine Pointing Loops]]
- [[DD - Set FSM Bandwidth Target Near 400 Hz]]
- [[REQ - Maintain Fine Pointing Stability]]
- [[REQ - Reject Platform Jitter and Beam Wander]]
- [[PHYS - Atmospheric Turbulence and Beam Wander]]
- [[PHYS - Pointing Error and Optical Link Margin]]
- [[COMP - Candidate Fast Steering Mirror]]
- [[COMP - Candidate Tracking Camera]]
- [[REF - Adaptive Optics and Atmospheric Turbulence Literature]]

## Status Levels

- `draft`: incomplete or newly created note
- `reviewed`: checked by a relevant engineer but not yet canonical
- `canonical`: current approved source of truth
- `superseded`: historically important but replaced by a later decision
- `conflicting`: unresolved conflict with another note

## AI Query Rule

AI assistants must prefer `canonical` notes, use `reviewed` notes when canonical notes are unavailable, and clearly label any information taken from `draft` or `conflicting` notes.