/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */


$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * This test loops through the allFeeds object and ensures it has a 
         * URL defined and that the URL is not empty.
         */
        console.log(allFeeds);
        it("urls are defined and not empty", function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
                expect(feed.url).not.toBe(null);
                expect(feed.url).toContain("//");
            });
        });

        /**
         * This test loops through the allFeeds object and ensures it has
         * a name defined and that the name is not empty.
         */
        it("names are defined and not empty", function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
                expect(feed.name).not.toBe(null);
            });
        });
        
    });

    /**
     * Test suite to test menu object
     */
    describe("The menu", function(){
        let menuHiddenAfterFirstClick;
        let menuHiddenAfterSecondClick;

        /**
         * This test ensures that the menu is hidden by default
         */
        it("is hidden by default", function(){
            expect(document.querySelector("body").classList.contains("menu-hidden")).toBe(true);
        });

        /**
         * This test ensures that the menu opens and closes when clicked, toggling state
         */
        it("changes visiblity when the menu is clicked", function(){
            //click hamburger menu and verify menu opens
            document.querySelector("i.icon-list").click();
            menuHiddenAfterFirstClick = document.querySelector("body").classList.contains("menu-hidden");
            expect(menuHiddenAfterFirstClick).toBe(false);

            //click again and test that the menu is closed
            document.querySelector("i.icon-list").click();
            menuHiddenAfterSecondClick = document.querySelector("body").classList.contains("menu-hidden");
            expect(menuHiddenAfterSecondClick).toBe(true);
        });
    });

    /**
     * Test suite for the initial entries function that loads initial entries to the RSS Feeder
     */
    describe("Initial Entries", function(){

        beforeEach(function(done){
            loadFeed(0, done);
        });

        /**
         * Test to ensure that after the initial entries of the rss feed have been loaded
         * there is at least one entry on the page within the .feed container
         */
        it("loadFeed should load at least 1 entry after complete", function(done){
            let entries = document.querySelectorAll(".feed .entry");
            expect(entries.length).toBeGreaterThan(0);
            done();
        });


    });

    /**
     * Test suite to capture tests for the rss feed changing selections
     */

    /**
     * Before our tests, we want to load two different feeds to capture information about then for
     * testing and comparision
     */
    describe("New Feed Selection", function(){
        let numOfEntriesBefore;
        let numOfEntriesAfter;
        beforeEach(function(done){
            loadFeed(0, () => {
                numOfEntriesBefore = document.querySelectorAll(".feed .entry").length;
                loadFeed(3, () => {
                    numOfEntriesAfter = document.querySelectorAll(".feed .entry").length;
                    done();
                });
            });
        });

        /**
         * Test to make sure that the rss entries actual change when a new feed is loaded
         */
        it("rss content changes when a new feed is loaded by loadFeed", function(done){
            expect(numOfEntriesBefore).not.toBe(numOfEntriesAfter);
            done();
        });
    });
}());