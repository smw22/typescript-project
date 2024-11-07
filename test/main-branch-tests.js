import { Selector } from "testcafe";

fixture("main tests")
    .page("test.sergioswordpresstest.dk/todo/");

test("Completed Button", async t => {
    await t
    .typeText ('#todo-input', 'hellooo')
    .click ('#add-todo')
    // .click('.completedBtn')
    // .expect (Selector('.completedBtn').style.backgroundColor("green"));
    .expect (Selector('body').innerText).contains("hellooo");
    
})
