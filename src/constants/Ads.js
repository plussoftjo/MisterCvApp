
let dev = true;

let Ads = {
    android:{
        basics_informations:dev ?"ca-app-pub-3940256099942544/1033173712":"ca-app-pub-8749426160957410/3317030921",
        educations:dev ? "ca-app-pub-3940256099942544/1033173712":"ca-app-pub-8749426160957410/5176907509",
        skills:dev ? "ca-app-pub-3940256099942544/1033173712":"ca-app-pub-8749426160957410/2167600786",
        generate_cv:dev ?"ca-app-pub-3940256099942544/1033173712":"ca-app-pub-8749426160957410/1522757048"
    },
    ios:{
        basics_informations:dev ? "ca-app-pub-3940256099942544/4411468910":"ca-app-pub-8749426160957410/3536522774",
        educations:dev ?"ca-app-pub-3940256099942544/4411468910":"ca-app-pub-8749426160957410/9144072670",
        skills:dev ?"ca-app-pub-3940256099942544/4411468910":"ca-app-pub-8749426160957410/2578664328",
        generate_cv:dev ?"ca-app-pub-3940256099942544/4411468910":"ca-app-pub-8749426160957410/8952500985"
    }
}

export default Ads