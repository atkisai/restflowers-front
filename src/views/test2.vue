<div class="card">
<h5>Horizontal and Vertical with Footer</h5>
<DataTable :value="customers2" :scrollable="true" scrollHeight="400px" :loading="loading" scrollDirection="both">
  <Column field="id" header="Id" footer="Id" style="width:100px"></Column>
  <Column field="name" header="Name" footer="Name" style="width:200px"></Column>
  <Column field="country.name" header="Country" footer="Country" style="width:200px"></Column>
  <Column field="date" header="Date" footer="Date" style="width:200px"></Column>
  <Column field="balance" header="Balance" footer="Balance" style="width:200px">
    <template #body="{data}">
      {{formatCurrency(data.balance)}}
    </template>
  </Column>
  <Column field="company" header="Company" footer="Company" style="width:200px"></Column>
  <Column field="status" header="Status" footer="Status" style="width:200px"></Column>
  <Column field="activity" header="Activity" footer="Activity" style="width:200px"></Column>
  <Column field="representative.name" header="Representative" footer="Representative" style="width:200px"></Column>
</DataTable>
</div>