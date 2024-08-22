<template>
	<div id="layout-config" :class="containerClass">
		<a href="#" class="layout-config-button" id="layout-config-button" @click="toggleConfigurator">
			<i class="pi pi-cog pi-spin"></i>
		</a>
		<Button class="p-button-danger layout-config-close p-button-rounded p-button-text" icon="pi pi-times" @click="hideConfigurator" :style="{'z-index': 1}"></Button>

		<div class="layout-config-content">
      <h5 class="mt-0">Метод загрузки</h5>
      <div class="p-formgroup-inline">
        <div class="field-radiobutton">
          <RadioButton id="input_outlined" name="inputstyle" value="30" :modelValue="this.$store.state.download" @change="changeDownload('30')" />
          <label for="input_outlined">По 30</label>
        </div>
        <div class="field-radiobutton">
          <RadioButton id="input_filled" name="inputstyle" value="all" :modelValue="this.$store.state.download" @change="changeDownload('all')" />
          <label for="input_filled">Все сразу</label>
        </div>
      </div>

			<h5 class="mt-0">Масштаб</h5>
			<div class="config-scale">
				<Button icon="pi pi-minus" @click="decrementScale()" class="p-button-text" :disabled="scale === scales[0]"/>
				<i class="pi pi-circle-on" v-for="s of scales" :class="{'scale-active': s === scale}" :key="s"/>
				<Button icon="pi pi-plus"  @click="incrementScale()" class="p-button-text" :disabled="scale === scales[scales.length - 1]" />
			</div>

			<h5>Стиль ввода</h5>
			<div class="p-formgroup-inline">
				<div class="field-radiobutton">
					<RadioButton id="input_outlined" name="inputstyle" value="outlined" :modelValue="$primevue.config.inputStyle" @change="changeInputStyle('outlined')" />
					<label for="input_outlined">Outlined</label>
				</div>
				<div class="field-radiobutton">
					<RadioButton id="input_filled" name="inputstyle" value="filled" :modelValue="$primevue.config.inputStyle" @change="changeInputStyle('filled')" />
					<label for="input_filled">Filled</label>
				</div>
			</div>

			<h5>Волновой эффект</h5>
			<InputSwitch :modelValue="rippleActive" @update:modelValue="changeRipple" />

			<h5>Тип меню</h5>
			<div class="p-formgroup-inline">
				<div class="field-radiobutton">
					<RadioButton id="static" name="layoutMode" value="static" v-model="d_layoutMode" @change="changeLayout($event, 'static')" />
					<label for="static">Static</label>
				</div>
				<div class="field-radiobutton">
					<RadioButton id="overlay" name="layoutMode" value="overlay" v-model="d_layoutMode" @change="changeLayout($event, 'overlay')" />
					<label for="overlay">Overlay</label>
				</div>
			</div>

			<h5>Темы</h5>
			<h6 class="mt-0">Bootstrap</h6>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'bootstrap4-light-blue', false)">
						<img class="block" src="images/themes/bootstrap4-light-blue.svg" alt="Bootstrap Light Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'bootstrap4-light-purple', false)">
						<img class="block" src="images/themes/bootstrap4-light-purple.svg" alt="Bootstrap Light Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'bootstrap4-dark-blue', true)">
						<img class="block" src="images/themes/bootstrap4-dark-blue.svg" alt="Bootstrap Dark Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'bootstrap4-dark-purple', true)">
						<img class="block" src="images/themes/bootstrap4-dark-purple.svg" alt="Bootstrap Dark Blue" />
					</button>
				</div>
			</div>

			<h6>Material Design</h6>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'md-light-indigo', false)">
						<img class="block" src="images/themes/md-light-indigo.svg" alt="Material Light Indigo" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'md-light-deeppurple', false)">
						<img class="block" src="images/themes/md-light-deeppurple.svg" alt="Material Light Deep Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'md-dark-indigo', true)">
						<img class="block" src="images/themes/md-dark-indigo.svg" alt="Material Dark Indigo" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'md-dark-deeppurple', true)">
						<img class="block" src="images/themes/md-dark-deeppurple.svg" alt="Material Dark Deep Purple" />
					</button>
				</div>
			</div>

			<h6>Material Design Compact</h6>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'mdc-light-indigo', false)">
						<img class="block" src="images/themes/md-light-indigo.svg" alt="Material Compact Light Indigo"/>
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'mdc-light-deeppurple', false)">
						<img class="block" src="images/themes/md-light-deeppurple.svg" alt="Material Compact Deep Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'mdc-dark-indigo', true)">
						<img class="block" src="images/themes/md-dark-indigo.svg" alt="Material Compact Dark Indigo" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'mdc-dark-deeppurple', true)">
						<img class="block" src="images/themes/md-dark-deeppurple.svg" alt="Material Compact Dark Deep Purple" />
					</button>
				</div>
			</div>

			<h6>Tailwind</h6>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'tailwind-light', false)">
						<img class="block" src="images/themes/tailwind-light.png" alt="Tailwind Light"/>
					</button>
				</div>
			</div>

			<h6>Fluent UI</h6>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'fluent-light', false)">
						<img class="block" src="images/themes/fluent-light.png" alt="Fluent Light"/>
					</button>
				</div>
			</div>

			<h6>PrimeOne Design - 2022</h6>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-light-indigo', false)">
						<img class="block" src="images/themes/lara-light-indigo.png" alt="Lara Light Indigo" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-light-blue', false)">
						<img class="block" src="images/themes/lara-light-blue.png" alt="Lara Light Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-light-purple', false)">
						<img class="block" src="images/themes/lara-light-purple.png" alt="Lara Light Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-light-teal', false)">
						<img class="block" src="images/themes/lara-light-teal.png" alt="Lara Light Teal" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-dark-indigo', true)">
						<img class="block" src="images/themes/lara-dark-indigo.png" alt="Lara Dark Indigo" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-dark-blue', true)">
						<img class="block" src="images/themes/lara-dark-blue.png" alt="Lara Dark Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-dark-purple', true)">
						<img class="block" src="images/themes/lara-dark-purple.png" alt="Lara Dark Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'lara-dark-teal', true)">
						<img class="block" src="images/themes/lara-dark-teal.png" alt="Lara Dark Teal" />
					</button>
				</div>
			</div>

			<h6>PrimeOne Design - 2021</h6>
			<div class="grid free-themes">
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-blue', false)">
						<img class="block" src="images/themes/saga-blue.png" alt="Saga Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-green', false)">
						<img class="block" src="images/themes/saga-green.png" alt="Saga Green" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-orange', false)">
						<img class="block" src="images/themes/saga-orange.png" alt="Saga Orange" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'saga-purple', false)">
						<img class="block" src="images/themes/saga-purple.png" alt="Saga Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-blue', true)">
						<img class="block" src="images/themes/vela-blue.png" alt="Vela Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-green', true)">
						<img class="block" src="images/themes/vela-green.png" alt="Vela Green" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-orange', true)">
						<img class="block" src="images/themes/vela-orange.png" alt="Vela Orange" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'vela-purple', true)">
						<img class="block" src="images/themes/vela-purple.png" alt="Vela Purple" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-blue', true)">
						<img class="block" src="images/themes/arya-blue.png" alt="Arya Blue" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-green', true)">
						<img class="block" src="images/themes/arya-green.png" alt="Arya Green" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-orange', true)">
						<img class="block" src="images/themes/arya-orange.png" alt="Arya Orange" />
					</button>
				</div>
				<div class="col-3 text-center">
					<button class="p-link" type="button" @click="changeTheme($event, 'arya-purple', true)">
						<img class="block" src="images/themes/arya-purple.png" alt="Arya Purple" />
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import EventBus from './AppEventBus';
import InputSwitch from 'primevue/inputswitch';
export default {
  components:{InputSwitch},
  props: {
    layoutMode: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      active: false,
      d_layoutMode: this.layoutMode,
      scale: 16,
      scales: [12,13,14,15,16]
    }
  },
  outsideClickListener: null,
  themeChangeListener: null,
  watch: {
    $route() {
      if (this.active) {
        this.active = false;
        this.unbindOutsideClickListener();
      }
    },
    layoutMode(newValue) {
      this.d_layoutMode = newValue;
    }
  },
  beforeUnmount() {
    EventBus.off('theme-change', this.themeChangeListener);
  },
  mounted() {
    this.themeChangeListener = () => {
      this.applyScale();
    };

    EventBus.on('theme-change', this.themeChangeListener);
  },
  methods: {
    toggleConfigurator(event) {
      this.active = !this.active;
      event.preventDefault();

      if (this.active)
        this.bindOutsideClickListener();
      else
        this.unbindOutsideClickListener();
    },
    hideConfigurator(event) {
      this.active = false;
      this.unbindOutsideClickListener();
      event.preventDefault();
    },
    changeDownload(value){
      this.$store.commit('setDownload',value)
    },
    changeInputStyle(value) {
      this.$primevue.config.inputStyle = value;
    },
    changeRipple(value) {
      // console.log(value)
      this.$primevue.config.ripple = value;
      // console.log(this.$primevue.config.ripple)
    },
    changeLayout(event, layoutMode) {
      this.$emit('layout-change', layoutMode);
      event.preventDefault();
    },
    bindOutsideClickListener() {
      if (!this.outsideClickListener) {
        this.outsideClickListener = (event) => {
          if (this.active && this.isOutsideClicked(event)) {
            this.active = false;
          }
        };
        document.addEventListener('click', this.outsideClickListener);
      }
    },
    unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        document.removeEventListener('click', this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked(event) {
      return !(this.$el.isSameNode(event.target) || this.$el.contains(event.target));
    },
    decrementScale() {
      this.scale--;
      this.applyScale();
    },
    incrementScale() {
      this.scale++;
      this.applyScale();
    },
    applyScale() {
      document.documentElement.style.fontSize = this.scale + 'px';
    },
    changeTheme(event, theme, dark) {
      EventBus.emit('theme-change', { theme: theme, dark: dark });
      event.preventDefault();
    }
  },
  computed: {
    containerClass() {
      return ['layout-config', {'layout-config-active': this.active}];
    },
    rippleActive() {
      return this.$primevue.config.ripple;
    },
    inputStyle() {
      return this.$appState.inputStyle;
    }
  }
}
</script>

<style scoped lang="scss">
$fontSize:14px;
$borderRadius:12px;
$transitionDuration:.2s;
.layout-config {
  position: fixed;
  top: 0;
  padding: 0;
  right: 0;
  width: 20rem;
  z-index: 999;
  height: 100vh;
  transform: translateX(100%);
  transition: transform $transitionDuration;
  backface-visibility: hidden;
  box-shadow: 0px 3px 5px rgba(0,0,0,.02), 0px 0px 2px rgba(0,0,0,.05), 0px 1px 4px rgba(0,0,0,.08) !important;
  color: var(--text-color);
  background-color: var(--surface-overlay);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;

  &.layout-config-active {
    transform: translateX(0);
  }

  .layout-config-button {
    display: block;
    position: absolute;
    width: 52px;
    height: 52px;
    line-height: 52px;
    background-color: var(--primary-color);
    color: var(--primary-color-text);
    text-align: center;
    top: 230px;
    left: -52px;
    z-index: -1;
    overflow: hidden;
    cursor: pointer;
    border-top-left-radius: $borderRadius;
    border-bottom-left-radius: $borderRadius;
    transition: background-color $transitionDuration;

    i {
      font-size: 32px;
      line-height: inherit;
      cursor: pointer;
      transform: rotate(0deg);
      transition: color $transitionDuration, transform 1s;
    }
  }

  .layout-config-close {
    position: absolute;
    right: 1rem;
    top: 1rem;
    z-index: 1;
  }

  .layout-config-content {
    position: relative;
    overflow: auto;
    height: 100vh;
    padding: 2rem;
  }

  .config-scale {
    display: flex;
    align-items: center;
    margin: 1rem 0 2rem 0;

    .p-button {
      margin-right: .5rem;
    }

    i {
      margin-right: .5rem;
      font-size: .75rem;
      color: var(--text-color-secondary);

      &.scale-active {
        font-size: 1.25rem;
        color: var(--primary-color);
      }
    }
  }

  .free-themes {
    img {
      width: 2rem;
      border-radius: 4px;
      transition: transform .2s;

      &:hover {
        transform: scale(1.1);
      }
    }

    span {
      font-size: .75rem;
      margin-top: .25rem;
    }
  }
}

</style>
