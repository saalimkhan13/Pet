class Food
{
    constructor(){
        this.image = loadImage("images/milk.png")
    }
    getFood()
    {
        var foodStockRef = database.ref('Food')
        foodStockRef.on("value",(data)=>{
            foodS = data.val();
        })
    }

    feedDog(x)
    {
        if(x<=0)
        {
            x=0
        }
        else{
            x -= 1
            dog.addImage(happyDog)
            image(this.image,300,700,80,80)
        }
        database.ref('/').update({
            Food:x,
            feedTime:hour()
        })
    }

    

    addFood(y)
    {
        foodS++;
        database.ref('/').update({
            Food:foodS
        })
    }
    
    Bedroom()
    {
        background(bedroom,550,500)
    }

    Garden()
    {
        background(garden,550,500)
    }

    Washroom()
    {
        background(washroom,550,500)
    }

    display()
    {
        var x = 80,
        y = 30;

        if(foodS !== 0)
        {
            for(var i = 0; i < foodS; i++)
            {
                if(i % 10 === 0 )
                {
                    x= 80;
                    y = y +80;
                }
                image(this.image,x,y,80,80);
                x = x +40
            }
        }
    }
}
