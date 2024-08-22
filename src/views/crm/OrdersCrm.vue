<template>
  <div class="card" style="max-width: 650px; margin: 0 auto;text-align: center">
    <!--   responsiveLayout="scroll"   -->
    <DataTable :value="orders" stripedRows :scrollable="true" scrollHeight="1000px" scrollDirection="both" v-model:expandedRows="expandedRows" dataKey="id">
      <template #header>
        <div class="table-header-container">
          <Button v-if="expand_all==false" icon="pi pi-plus" label="Раскрыть все" @click="expandAll" class="p-button-sm p-button-text p-button-raised"/>
          <Button v-if="expand_all==true" icon="pi pi-minus" label="Свернуть все" @click="collapseAll" class="p-button-sm p-button-text p-button-raised"/>
        </div>
      </template>
      <Column expander header="Букеты" style="width: 71px"/>
      <Column field="id" header="id" sortable style="width: 57px"/>
      <Column field="date" header="Дата и время доставки" sortable style="width: 156px"/>
      <Column field="status" header="Статус" sortable style="width: 90px">
        <template #body="slotProps">
          <span :class="'order-badge ' + slotProps.data.status.toLowerCase()">{{slotProps.data.status}}</span>
        </template>
      </Column>
      <Column field="city.name" header="Город" sortable style="width: 90px"/>
      <Column field="sum_result" header="Стоимость" sortable style="width: 120px"/>
      <template #expansion="slotProps">
        <div class="orders-subtable">

          <DataTable :value="slotProps.data.order_items" responsiveLayout="scroll" :scrollable="false" class="z-index-0" v-model:expandedRows="expandedRows2">
            <Column expander header="Допы" style="width: 90px"></Column>
            <Column field="item.name" header="Букет" sortable style="width: 200px"></Column>
            <Column header="Фото" style="width: 120px">
              <template #body="slotProps">
                <photo-provider class="cardImages">
                  <photo-consumer v-for="(src,index) in slotProps.data.item.images" :key="api+src.image" :src="api+src.image" style="display: block">
                    <img v-if="index==0" :src="api+src.image" class="image product-image"/>
                  </photo-consumer>
                </photo-provider>
              </template>
            </Column>
            <Column field="amount" header="Кол." sortable style="width: 70px"></Column>
            <Column field="item.price" header="Стоимость" sortable></Column>

            <template #expansion="slotProps">
              <div class="orders-subtable">

                <DataTable :value="slotProps.data.extra_item" responsiveLayout="scroll" :scrollable="false" class="z-index-0">
                  <Column field="extra.name" header="Доп" sortable style="width: 200px"></Column>
                  <Column header="Фото" style="width: 120px">
                    <template #body="slotProps">
                      <photo-provider class="cardImages">
                        <photo-consumer :src="api+slotProps.data.extra.picture" style="display: block">
                          <img :src="api+slotProps.data.extra.picture" class="image product-image"/>
                        </photo-consumer>
                      </photo-provider>
                    </template>
                  </Column>
                  <Column field="amount" header="Кол." sortable style="width: 70px"></Column>
                  <Column field="extra.price" header="Стоимость" sortable></Column>
                </DataTable>
              </div>
            </template>

          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrdersCrm",
  data(){
    return{
      api:localStorage.getItem('api'),
      orders:'',
      expandedRows: [],
      expandedRows2: [],
      expand_all:false,
    }
  },
  mounted() {
    axios.get(this.api+'api/crm_orders/').then((res)=>{
      console.log(res.data)
      this.orders = res.data
    })
  },
  methods:{
    expandAll() {
      this.expand_all=true
      this.expandedRows = this.orders.filter(p => p.id);
    },
    collapseAll() {
      this.expand_all=false
      this.expandedRows = null;
    },
  }
}
</script>

<style scoped>

</style>