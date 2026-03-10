export interface MicroTask {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  category: string;
}

export const dummyTaskSets: Record<string, MicroTask[]> = {
  default: [
    {
      id: 1,
      title: "Locate the payment API code",
      description: "Find and review the existing payment API integration files in the codebase.",
      priority: "high",
      estimatedTime: "15 min",
      category: "Research",
    },
    {
      id: 2,
      title: "Check timeout configuration",
      description: "Review and document the current timeout settings for the payment gateway.",
      priority: "high",
      estimatedTime: "10 min",
      category: "Analysis",
    },
    {
      id: 3,
      title: "Add retry logic",
      description: "Implement exponential backoff retry mechanism for failed payment requests.",
      priority: "medium",
      estimatedTime: "30 min",
      category: "Development",
    },
    {
      id: 4,
      title: "Write test cases",
      description: "Create unit and integration tests for the payment retry logic.",
      priority: "medium",
      estimatedTime: "45 min",
      category: "Testing",
    },
    {
      id: 5,
      title: "Verify error handling",
      description: "Ensure all edge cases and error scenarios are gracefully handled and logged.",
      priority: "low",
      estimatedTime: "20 min",
      category: "QA",
    },
  ],
};

export const generateDummyTasks = (taskDescription: string): MicroTask[] => {
  // Simulate AI-generated task breakdown based on input keywords
  if (taskDescription.toLowerCase().includes("auth") || taskDescription.toLowerCase().includes("login")) {
    return [
      { id: 1, title: "Review existing auth flow", description: "Analyze the current authentication system and identify gaps.", priority: "high", estimatedTime: "20 min", category: "Research" },
      { id: 2, title: "Implement JWT validation", description: "Add token verification middleware to secured endpoints.", priority: "high", estimatedTime: "40 min", category: "Development" },
      { id: 3, title: "Add refresh token logic", description: "Implement secure refresh token rotation and storage.", priority: "medium", estimatedTime: "35 min", category: "Development" },
      { id: 4, title: "Test auth edge cases", description: "Write tests for expired tokens, invalid credentials, and concurrent sessions.", priority: "medium", estimatedTime: "30 min", category: "Testing" },
      { id: 5, title: "Document auth endpoints", description: "Create OpenAPI documentation for all authentication routes.", priority: "low", estimatedTime: "25 min", category: "Documentation" },
    ];
  }
  if (taskDescription.toLowerCase().includes("ui") || taskDescription.toLowerCase().includes("design")) {
    return [
      { id: 1, title: "Audit current UI components", description: "Review all existing components for consistency and reusability.", priority: "high", estimatedTime: "30 min", category: "Analysis" },
      { id: 2, title: "Create design tokens", description: "Define color palette, typography, and spacing variables.", priority: "high", estimatedTime: "25 min", category: "Design" },
      { id: 3, title: "Build reusable components", description: "Develop Button, Input, Card, and Modal components.", priority: "medium", estimatedTime: "60 min", category: "Development" },
      { id: 4, title: "Implement responsive layouts", description: "Ensure all pages work seamlessly on mobile, tablet, and desktop.", priority: "medium", estimatedTime: "45 min", category: "Development" },
      { id: 5, title: "Accessibility audit", description: "Run axe-core checks and fix WCAG 2.1 AA violations.", priority: "low", estimatedTime: "30 min", category: "QA" },
    ];
  }
  return dummyTaskSets.default;
};
