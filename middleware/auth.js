
export default function ({store, redirect}){
  if(!store.state.user) {
    console.log('MIDDLEWARE');
    redirect("teste", "/login");

    // $nuxt.error({ statusCode: 403 })
  }

}