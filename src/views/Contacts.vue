<template>
  <div style="max-width: 1200px;margin: 0 auto;padding:20px;text-align: center">
    <h2>Контакты</h2>
    <ul class="my-ul">
      <li class="card my-li contacts">
        <div class="contacts_title">Время работы</div><br>
        <div class="contacts_text">Каждый день с 09:00 до 24:00</div>
      </li>
      <li class="card my-li contacts">
        <a href="tel:+7 777 777 77 77">
          <div class="contacts_title">Телефон</div><br>
          <div class="contacts_text">+7 777 777 77 77</div>
        </a>
      </li>
      <li class="card my-li contacts">
        <a class="contacts_text" href="https://api.whatsapp.com/send/?phone=+7 777 777 77 77&amp;text&amp;app_absent=0" target="_blank">
          <div class="contacts_title">WhatsApp</div><br>
          <div class="contacts_text">+7 777 777 77 77</div>
        </a>
      </li>
      <li class="card my-li contacts">
        <a class="contacts_text" href="https://instagram.com/restflowers.com/" target="_blank">
          <div class="contacts_title">Instagram</div><br>
          <div class="contacts_text">@restflowers.com</div>
        </a>
      </li>
      <li class="card my-li contacts">
        <a class="contacts_text" href="mailto:info@restflowers.com" target="_blank">
          <div class="contacts_title">Email</div><br>
          <div class="contacts_text">restflowers@gmail.com</div>
        </a>
      </li>
    </ul>
    <div class="card" id="map" style="height: 500px"></div>
  </div>
</template>

<script>
// import '../../node_modules/leaflet/dist/leaflet.css'
// import '../../node_modules/leaflet/dist/leaflet.js'
export default {
  name: "Contacts",
  data(){
    return{
      map:null
    }
  },
  mounted() {
    var map
    map = L.map('map').setView([50.4546600, 30.5238000], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([50.4546600, 30.5238000]).addTo(map)
        .bindPopup('<p style="text-align: center">Магазин цветов<br>RestFlowers</p>')
        .openPopup();
  }
}
</script>

<style scoped>

</style>