/**
 * Created by dmitry.sobolevsky on 04.04.2017.
 */

function TClock () {
    var self=this;
    self.Hour=0;
    self.Minutes=0;
    self.Seconds=0;
    var State=1;
    var GMT=-3;

    self.Go=function () {
        if (State){
            var CurrTime= new Date;
            self.Hour=CurrTime.getHours()+GMT;
            self.Minutes=CurrTime.getMinutes();
            self.Seconds=CurrTime.getSeconds();
        }
    };
    self.SetGMT=function (arg) {
        GMT+=arg;
    };
    self.Go();
    self.Start=function () {
        State=1;
        setInterval(self.Go,1000);
    };

    self.Stop=function () {
       State=0;
    };

    self.Start();



    
}
