

describe('Automate Flipkart', () => {
    it('Search Flipkart and Scrape details ', async () => {

        //  Access Flipkart URL and perform Search
        await browser.url("https://www.flipkart.com/search");
        const getSearchbar = await $('[title="Search for products, brands and more"]');
        await getSearchbar.setValue('Samsung Galaxy S10');
        await $('button[type="submit"]').click();
       
       // Select Mobile Category
        let mobiles = await $('[title="Mobiles"]');
        await expect(mobiles).toExist();
        await mobiles.waitForDisplayed({ timeout: 9000 });
        await mobiles.click();
        let isExisting = await mobiles.isExisting()

       
        // Click the Samsung Brand Checkbox
        let brand = await $('[title="SAMSUNG"]');
        await expect(brand).toExist();
        isExisting = await brand.isExisting()
        await brand.click();
   
        // Click the Flipkart Assured Checkbox
        let fAssured = await $('img[src*="/img/fa_62673a.png"]');
        await fAssured.waitForDisplayed({ timeout: 9000 });
        isExisting = await fAssured.isExisting()
        await fAssured.click();
        await browser.pause(2000);

        // Sort by High to Low
        const sortBy = await $('div=Price -- High to Low');
        await sortBy.click();
        await browser.pause(5000); // Avoid Stale elements


        // Loop through items and print via console.log
        const getArrayofItems =  await $$('[data-id*="MOB"]');
        console.log('length of array: '+ getArrayofItems.length);
       const arrayLenght = getArrayofItems.length;
        const ProductList = [];
        for(let i = 0;i< arrayLenght;i++){
            const obj = {};
            const producText = await getArrayofItems[i].$("div>a>div:nth-child(2)>div>div");
            const displayPrice = await getArrayofItems[i].$("div>a>div:nth-child(2)>div:nth-child(2)>div>div>div");
            const productLink = await getArrayofItems[i].$("div>a");
            obj["Product Text"] = producText.getText();
            obj["Display Price"] = displayPrice.getText();
            obj["Product Link"] = productLink.getAttribute('href');
            ProductList.push(obj);
            //console.log("producText: "+ await producText.getText(),"displayPrice: "+ await displayPrice.getText(), "productLink: "+ await productLink.getAttribute('href'));
        }
         console.log(await ProductList);


    });
});



