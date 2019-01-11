<template>
  <div class="item">
    <div :class="weight.status">{{ weight.data }} <span class="unit">{{ weight.unit }}</span></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    weight: state => state.Weighing.weight,
  }),
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-weight: bold;
  font-size: 3em;
  background-color: black;
  padding-right: 14px;
  border-radius: 10px;
}
.item .unit {
  font-weight: bold;
  font-size: smaller;
}

.item .stable {
  color: blue;
}

.item .unstable {
  color: skyblue;
}

.item .overload {
  color: red;
}
</style>
