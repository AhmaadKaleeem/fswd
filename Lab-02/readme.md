# Lab 02: Advanced CSS, Flexbox & Responsive Portfolio

**Student:** Ahmad Kaleem Bhatti  
**Registration No:** 242820  
**Course:** Full Stack Web Development (FSWD)  
**Institution:** Air University Islamabad  

---

## Overview

This repository contains the deliverables for **Lab 02**, focusing on advanced CSS3 layouts, CSS Flexbox architecture, CSS positioning, pseudo-elements, interactive transitions and transforms, CSS image filters, and Bootstrap Flex utility integration. 

The lab combines these concepts into a production-grade, responsive single-page student portfolio following the dark technical design system of [ahmadkaleem.tech](https://ahmadkaleem.tech).

---

## Lab Tasks & Implemented Concepts

### **Task 1 — Student Profile Section (CSS Flexbox)**
- **Concepts:** `display: flex`, `justify-content`, `align-items`, `flex-wrap`, responsive media queries.
- Side-by-side flex layout for profile image, student credentials, introduction, and skills pills.
- Automatic responsive reflow to a vertical stacked layout on mobile viewports.

### **Task 2 — Interactive Project Cards (Transitions, Transforms & Filters)**
- **Concepts:** `display: flex`, CSS transitions, `transform: translateY()`, CSS filters (`grayscale`, `contrast`, `brightness`), `:hover`.
- Three responsive project cards (Web Development, Database System, AI/Machine Learning).
- High-tech interactive cards with elevation transforms on hover and dynamic CSS image filter removal.

### **Task 3 — Profile Badge (CSS Positioning & Pseudo-elements)**
- **Concepts:** `position: relative`, `position: absolute`, `::before`, `::after`.
- Student achievement card with an absolute-positioned `Featured` badge anchored at the top-right corner.
- Multi-color top accent gradient line rendered using the `::before` pseudo-element and ambient corner glow with `::after`.

### **Task 4 — Bootstrap Flexbox Dashboard**
- **Concepts:** Bootstrap 5 Flex utility classes (`d-flex`, `justify-content-between`, `align-items-center`, `flex-wrap`, `gap-3`).
- 4-metric student dashboard (Courses, Assignments, Projects, Attendance) that automatically wraps across viewport sizes without custom `display: flex` overrides.

### **Task 5 — Complete Mini Portfolio Challenge**
- Full single-page architecture integrating:
  1. Sticky Navigation Bar with responsive mobile toggle
  2. Student Profile (Task 1)
  3. Technical Skills Overview
  4. Featured Projects (Task 2)
  5. Student Achievement (Task 3)
  6. Student Dashboard (Task 4)
  7. Semantic Footer

---

## Files

- `index.html`: Complete single-page portfolio implementing all 5 lab tasks.
- `style.css`: Custom CSS styling including design tokens, CSS reset, flexbox layouts, hover transitions, positioning, pseudo-elements, and responsive media queries.
- `assets/personal.png`: Profile image asset.
- `assets/project-web.svg`: SVG illustration for the Web Development project card.
- `assets/project-db.svg`: SVG illustration for the Database System project card.
- `assets/project-ai.svg`: SVG illustration for the AI/ML project card.
- `readme.md`: Documentation for Lab 02.

---

## How to Run

No local build tools or web servers are required. Open `index.html` directly in any modern web browser (Chrome, Firefox, Edge, Safari).
