export interface MicroTask {
  id: number;
  title: string;
  status: "pending" | "in-progress" | "done";
}

export const dummyTasks: MicroTask[] = [
  { id: 1, title: "Locate the payment API code", status: "pending" },
  { id: 2, title: "Check timeout configuration", status: "pending" },
  { id: 3, title: "Add retry logic for failed requests", status: "pending" },
  { id: 4, title: "Write test cases for edge scenarios", status: "pending" },
  { id: 5, title: "Verify error handling and logging", status: "pending" },
];
