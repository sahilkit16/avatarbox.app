const { setWorldConstructor, Given, Then } = require('cucumber');
const expect = require('expect');
const World = require('../../world');

setWorldConstructor(World);

Given("that this is a test", function() { });

Then("dummy should be {int}", function(value) {
  expect(this.dummy).toBe(value);
});
