<template>
    <div>
        <iframe :src="url" :width="width" :height="height" frameborder="0" style="overflow:hidden" @load="onChangeHeight" scrolling=”auto” >

        </iframe>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                url: "",
                height: '0px',
                width: '0px',
            }
        },
        created: function(){
            this.url = this.$store.state.root+"/druid"
        },
        methods: {
          onChangeHeight: function(){
              this.height = (document.documentElement.clientHeight-55)+'px';
              this.width = (document.documentElement.clientWidth-250)+'px';
          }
        }
    }
</script>