<template>
  <q-item
    clickable
    tag="a"
    @click="navigateToLink"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">

import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class EssentialLink extends Vue {
  @Prop({ type: String, required: true }) readonly title!: string;
  @Prop({ type: String, default: '' }) readonly caption!: string;
  @Prop({ type: String, default: '#' }) readonly link!: string;
  @Prop({ type: String, default: ''}) readonly icon!: string;

  navigateToLink():void{
      const fullPath = this.link.startsWith('/') 
      ? this.link : `/${this.link}`;

      //verificar que la ruta actual sea diferente a la ruta a la que se quiere ir
      if(this.$route.path !== fullPath){
        this.$router.push(fullPath).catch(err => {
          console.error(err);
        })
      }else{
        this.$emit('close-sidebar')
      }
    }
}

</script>
