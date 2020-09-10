const icon = '<rect x="2" y="2" rx="2" ry="2" width="18" height="18" fill="blue" stroke="currentColor" stroke-width="2" />'

miro.onReady(() => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Show and Hide',
        svgIcon: icon,
        onClick: async () => {
          const authorized = await miro.isAuthorized()
          if (authorized) {
            showAndHide()
          } else {
            miro.board.ui.openModal('not-authorized.html')
              .then(res => {
                if (res === 'success') {
                  showAndHide()
                }
              })
          }
        }
      }
    }
  })
})

async function showAndHide() {

  let sticker = await miro.board.widgets.get({type: 'sticker'})
     if(sticker === undefined){

       console.log('Create the sticker');
       // always create sticker
       let newsticker = await miro.board.widgets.create([
         {type: 'sticker', text: 'I am sticker'}
       ])
     }
     else {
       console.log('Hide the sticker');
       await miro.board.widgets.deleteById(sticker[0].id);
     }

}
