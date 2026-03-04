---
layout: ../../layouts/ArticleLayout.astro
title: "Anomaly Detection in Spacecraft Telemetry: An Ensemble Approach"
description: "In safety-critical environments such as space operations, detecting anomalies accurately and efficiently is essential for mission continuity. This paper presents a hybrid ensemble framework combining Isolation Forest, a Telemanom-inspired temporal predictor, and an XGBoost meta-learning layer."
publication: "Google Developer Group on Campus – Guido Carli"
originalUrl: "/papers/ESA-Paper.pdf"
---

In safety-critical environments such as space operations, detecting anomalies accurately and efficiently is essential for mission continuity. This research paper presents a hybrid ensemble framework developed using a sample from the European Space Agency (ESA) Anomaly Detection Benchmark dataset, following the Kaggle challenge.

## Approach

The framework combines three complementary methods:

- **Isolation Forest** — an unsupervised algorithm that isolates anomalies by randomly partitioning the feature space, effective at catching point anomalies in high-dimensional telemetry data.
- **Telemanom-inspired Temporal Predictor** — a sequence-based model drawing from NASA's Telemanom architecture, designed to capture temporal dependencies and flag deviations from expected spacecraft behaviour over time.
- **XGBoost Meta-Learning Layer** — a gradient-boosted decision tree ensemble that aggregates the outputs of the base detectors, learning which signals are most indicative of true anomalies and reducing false positives.

## Emphasis on Interpretability

Our approach emphasises interpretability alongside performance, leveraging tree-based feature importance analysis to support actionable insights for mission operators. Rather than treating the model as a black box, the framework surfaces which telemetry channels and features drive each anomaly decision, enabling operators to act with confidence.

### SUMMARY
A hybrid ensemble framework for spacecraft telemetry anomaly detection combining Isolation Forest, a Telemanom-inspired temporal predictor, and XGBoost meta-learning. Built on ESA benchmark data, it balances detection performance with interpretability through tree-based feature importance analysis.
