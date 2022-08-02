const formList = document.querySelector("#form-list");
const tulisList = document.querySelector("#tulis-list");
const listKegiatan = document.querySelector("#list-kegiatan");
const bdcard = document.querySelector("#bd-card");
const hasil = document.createElement("div");
hasil.role = "alert";
const cariList = document.querySelector("#cari-list");
const hapusSemuaList = document.querySelector("#hapus-semua-list");

document.addEventListener("DOMContentLoaded", tampilList);
formList.addEventListener("submit", createList);
hasil.addEventListener("click", removeAlert);
listKegiatan.addEventListener("click", accessList);
cariList.addEventListener("keyup", pencarianList);
hapusSemuaList.addEventListener("click", hapusListItem);

function tampilList(){
    
    if(localStorage.getItem("list2") == null){
        list2= [];
    }else{
        list2= JSON.parse(localStorage.getItem("list2"));
    }
    list2.forEach((konten) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center item-list";

        li.appendChild(document.createTextNode(konten.isi)); 

        const div = document.createElement("div");
        div.className = "btn-group";
        div.role = "group";



        const successList = document.createElement("button");
        successList.className = "btn btn-success done-list";
        successList.type = "button";
        successList.innerHTML = "Selesai";


        div.appendChild(successList);

        li.appendChild(div);
        listKegiatan.appendChild(li);
        tulisList.value = "";
        hasil.className = "alert alert-success";
        hasil.innerHTML = "Anda berhasil menambahkan kegiatan hari ini!";
        bdcard.prepend(hasil);
    });
}
function createList(e){
        e.preventDefault();

        if(tulisList.value){
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center item-list";

        li.appendChild(document.createTextNode(tulisList.value)); 

        const div = document.createElement("div");
        div.className = "btn-group";
        div.role = "group";



        const successList = document.createElement("button");
        successList.className = "btn btn-success done-list";
        successList.type = "button";
        successList.innerHTML = "Selesai";


        div.appendChild(successList);

        li.appendChild(div);
        listKegiatan.appendChild(li);
        toLocalStorage(tulisList.value);
        tulisList.value = "";
        hasil.className = "alert alert-success";
        hasil.innerHTML = "Anda berhasil menambahkan kegiatan hari ini!";
        bdcard.prepend(hasil);
        }
        
        else{
            hasil.className = "alert alert-danger";
            hasil.innerHTML = "Anda tidak mengisi kegiatan, silahkan isi terlebih dahulu!";
            bdcard.prepend(hasil);
     
        }
   
}
function getList(){
    let list2;
    if(localStorage.getItem("list2") == null){
        list2 = [];
    } else {
        list2 = JSON.parse(localStorage.getItem("list2"));
    }
    return list2;
}
function toLocalStorage(isiList){
   const list2 = getList();

    list2.push({
        status:  0,
        isi: isiList
    });
    localStorage.setItem("list2", JSON.stringify(list2));
}
function removeAlert(){
    bdcard.removeChild(hasil);
}
function accessList(e){
    e.preventDefault();
if(e.target.classList.contains("done-list")) {
        if(confirm("Apakah anda yakin ingin menyelesaikan kegiatan ini?")){
            const element = e.target.parentElement;
            const elementList = element.parentElement;
            elementList.remove();
            hasil.className = "alert alert-primary";
            hasil.innerHTML = "Anda berhasil meenyelesaikan satu kegiatan hari ini!";
            bdcard.prepend(hasil);
            deleteList2(elementList);
            
        }
    }
}
function deleteList2(elementList){
    const list2 = getList();
    list2.forEach((konten, index) =>{
        if(elementList.firstChild.textContent === konten.isi){
            list2.splice(index, 1);
        }
        localStorage.setItem("list2", JSON.stringify(list2));

    });
}
function pencarianList(e){
    const cariList = e.target.value.toLowerCase();
    let itemList = document.querySelectorAll(".item-list");
    
    itemList.forEach((item) =>{
        const isiItem = item.firstChild.textContent.toLowerCase();
        if (isiItem.indexOf(cariList) != -1) {
            item.setAttribute("style", "display: block;");
        }else {
            item.setAttribute("style", "display: none !important;");
        }
    });

}
function hapusListItem(){
    if(confirm("Apakah anda yakin ingin meghapus semua list kegiatan hari ini?")){
      listKegiatan.innerHTML = "";
        
    }
    hapusSemuaDataDariLocalStorage();
}
function hapusSemuaDataDariLocalStorage(){
    localStorage.clear();
}
