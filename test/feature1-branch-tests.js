import { Selector } from "testcafe";

fixture("main tests")
    .page("test.sergioswordpresstest.dk/todo/");

test("Check if the backgound color turns black", async t => {
    await t
    .click ('#dark-mode')
    .expect(Selector('body').getStyleProperty('background-color')).eql('rgb(0, 0, 0)');
    
})
