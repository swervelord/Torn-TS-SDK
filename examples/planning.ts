import { RequestPlanner, PlanRequest } from "../src/index.ts";

// Planning is offline and does not need an API key.
const plan=new RequestPlanner().plan(new PlanRequest("user",["profile","discord","hof"]).withId("3637232"));
console.log(JSON.stringify(plan,null,2));
