import { Selector } from "testcafe";

fixture("main tests")
    .page("test.sergioswordpresstest.dk/todo/");

test("Check if it removes all todos after confirmation", async t => {
    await t
    .setNativeDialogHandler(() => true); // Automatically confirm the dialog
    await t
    .typeText ('#todo-input', 'test')
    .click ('#add-todo')
    .typeText ('#todo-input', 'test2')
    .click ('#add-todo')
    await t
    .click ('#remove-all-todos')
    await t
    .expect(Selector('#todo-list').childElementCount).eql(0, "All todos should be removed after confirmation");
    
})
