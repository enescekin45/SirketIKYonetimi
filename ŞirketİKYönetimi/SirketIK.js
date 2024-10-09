let calisanlar = [];

// Çalışan ekleme fonksiyonu
function calisanEkle(isim, yas, departman, maas) {
    if (!isim || yas < 18 || maas < 0) {
        console.error("Geçersiz bilgi. İsim, yaş veya maaş hatalı.");
        return;
    }

    let mevcut = calisanlar.some(calisan => calisan.isim === isim);
    if (mevcut) {
        console.warn("Bu isimde bir çalışan zaten mevcut.");
        return;
    }

    const yeniCalisan = { isim, yas, departman, maas };
    calisanlar = [...calisanlar, yeniCalisan]; // spread operator kullanarak diziye yeni çalışan ekliyoruz.
    console.log(`${isim} başarıyla sisteme eklendi.`);
}

// Çalışan güncelleme fonksiyonu
function calisanGuncelle(isim, yeniYas, yeniDepartman, yeniMaas) {
    let index = calisanlar.findIndex(calisan => calisan.isim === isim);

    if (index === -1) {
        console.error("Güncellenecek çalışan bulunamadı.");
        return;
    }

    if (yeniYas >= 18 && yeniMaas >= 0) {
        calisanlar[index] = { ...calisanlar[index], yas: yeniYas, departman: yeniDepartman, maas: yeniMaas }; // spread operator ile mevcut çalışan güncelleniyor
        console.log(`${isim} bilgileri başarıyla güncellendi.`);
    } else {
        console.error("Geçersiz bilgi. Güncelleme işlemi başarısız.");
    }
}

// Çalışan silme fonksiyonu
function calisanSil(isim) {
    const uzunlukOnce = calisanlar.length;
    calisanlar = calisanlar.filter(calisan => calisan.isim !== isim);

    if (calisanlar.length === uzunlukOnce) {
        console.error("Silinecek çalışan bulunamadı.");
    } else {
        console.log(`${isim} başarıyla sistemden silindi.`);
    }
}

// Departmana göre çalışan listeleme fonksiyonu
function calisanListeleDepartman(departman) {
    const departmandakiCalisanlar = calisanlar.filter(calisan => calisan.departman === departman);
    
    if (departmandakiCalisanlar.length === 0) {
        console.log(`Bu departmanda çalışan bulunmamaktadır.`);
    } else {
        console.log(`${departman} departmanındaki çalışanlar:`);
        departmandakiCalisanlar.forEach(({ isim, yas, maas }) => {
            console.log(`İsim: ${isim}, Yaş: ${yas}, Maaş: ${maas}`);
        });
    }
}

// En yüksek maaşlı çalışanı bulma fonksiyonu
function enYuksekMaasliCalisan() {
    if (!calisanlar.length) {
        console.warn("Sistemde çalışan bulunmamaktadır.");
        return;
    }

    const enYuksekMaasli = calisanlar.reduce((enYuksek, calisan) => 
        calisan.maas > enYuksek.maas ? calisan : enYuksek
    );
    console.log(`En yüksek maaşlı çalışan: ${enYuksekMaasli.isim}, Maaş: ${enYuksekMaasli.maas}`);
}

// Toplam maaş hesaplama fonksiyonu
function toplamMaasHesapla(departman = null) {
    const secilenCalisanlar = departman 
        ? calisanlar.filter(calisan => calisan.departman === departman) 
        : calisanlar;

    if (!secilenCalisanlar.length) {
        console.log(departman ? `${departman} departmanında çalışan yok.` : "Sistemde çalışan bulunmamaktadır.");
        return;
    }

    const toplamMaas = secilenCalisanlar.reduce((toplam, calisan) => toplam + calisan.maas, 0);
    console.log(departman ? `${departman} departmanının toplam maaş maliyeti: ${toplamMaas} TL` : `Tüm çalışanların toplam maaş maliyeti: ${toplamMaas} TL`);
}

// Test için örnek çalışanlar ekleyelim
calisanEkle("Ali", 25, "IT", 7500);
calisanEkle("Ayşe", 30, "Muhasebe", 8500);
calisanEkle("Mehmet", 40, "Pazarlama", 6000);

// Çeşitli fonksiyonları test edelim
calisanListeleDepartman("IT");
enYuksekMaasliCalisan();
toplamMaasHesapla();
calisanGuncelle("Ali", 26, "IT", 8000);
calisanSil("Mehmet");
