# Instructions

## Problem: The current codebase works locally but fails when deployed to the digital ocean droplet. Issue seems to arise from sqlite / wasm packages.

## Goal: fork and modify Ponder package to only do indexing and not the local postgress database.

1. Think through how we can replace the package @ponder/core with a forked version. Do we clone the forked repo within this indexer codebase? Here's the repo: https://github.com/ponder-sh/ponder
