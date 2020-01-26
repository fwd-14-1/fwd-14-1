function MiniBasket()
    {
        var self = this;


        this.content_container      = document.getElementById( 'mini-basket__hover_content' );
        this.display_link           = document.getElementById( 'mini-basket__background' );
    
        
        if ( this.content_container )
        {
            
            if ( this.display_link ){
                 this.display_link.onmouseover       = function() { self.Show(); }
                 this.display_link.onmouseout        = function() { self.Hide(); }    
            }       
                   


            this.content_container.style.display = 'none';
        }
    }


    MiniBasket.prototype.Show = function()
    {
        var self = this;
        
        this.content_container.style.display  = 'block';
        
    }


    MiniBasket.prototype.Hide = function()
    {
        this.content_container.style.display  = 'none';
        
        window.onresize = null;
    }


    var minibasket = new MiniBasket();