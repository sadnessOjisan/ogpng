export default {
  html: {
    mobile: `<div style=
    background: radial-gradient(#F2B9A1, #EA6264);
    width: 219px;
    height: 110px;
    padding: 12px;
    text-align: center;
    color: white;
    font-size: 12px;
    font-family: 'ヒラギノ角ゴ ProN W3';
    display: flex;
    flex-direction: column;
    justify-content: center;
    "
>
   <p style="margin-bottom: 8px;">HTMLならなんでも書き込めます。</p>
   <p style="margin-bottom: 8px;">TwitterのOGPは438 x 220 です。</p>
   <p>JS & JSX でも使えます。</p>
</div>`,
    pc: `<div style="
    background: radial-gradient(#F2B9A1, #EA6264);
    width: 438px;
    height: 220px;
    padding: 24px;
    text-align: center;
    color: white;
    font-size: 20px;
    font-family: 'ヒラギノ角ゴ ProN W3';
    display: flex;
    flex-direction: column;
    justify-content: center;
    "
>
   <p style="margin-bottom: 12px;">HTMLならなんでも書き込めます。</p>
   <p style="margin-bottom: 12px;">TwitterのOGPは438 x 220 です。</p>
   <p>JS & JSX の対応をいま頑張ってます。</p>
</div>`,
  },
  jsx: {
    mobile: `<div style={{
        background: 'radial-gradient(#F26AA1, #EA6264)',
        width: '219px',
        height: '110px',
        padding: '24px',
        textAlign: 'center',
        color: 'white',
        fontSize: '20px',
        fontFamily: 'ヒラギノ角ゴ ProN W3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }}
>
   <p style={{marginBottom: '12px'}}>HTMLならなんでも書き込めます。</p>
   <p style={{marginBottom: '12px'}}>TwitterのOGPは438 x 220 です。</p>
   <p>JS & JSX の対応をいま頑張ってます。</p>
</div>`,
    pc: `<div style={{
        background: 'radial-gradient(#F26AA1, #EA6264)',
        width: '438px',
        height: '220px',
        padding: '24px',
        textAlign: 'center',
        color: 'white',
        fontSize: '20px',
        fontFamily: 'ヒラギノ角ゴ ProN W3',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }}
>
   <p style={{marginBottom: '12px'}}>HTMLならなんでも書き込めます。</p>
   <p style={{marginBottom: '12px'}}>TwitterのOGPは438 x 220 です。</p>
   <p>JS & JSX の対応しました。</p>
</div>`,
  },
};
