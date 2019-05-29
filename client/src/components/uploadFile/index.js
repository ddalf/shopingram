import React from 'react';
import Style from './index.scss'
import API from '@common/api.js'

class DefaultUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          file: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
      }
    
    
      _handleImageChange = async (e) => {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];

        console.log('file : ', file);
    
        reader.onloadend = () => {
          this.setState({
            file: file
          });
        }
    
        reader.readAsDataURL(file);
        const formData = new FormData();
        formData.append('file',file)
        const response = await API.addTopicImage(formData);

        console.log('response', response);
        const imgUrl = response.data.imgUrl;
        if(imgUrl){
          console.log('imgUrl');
          this.props.successCb(imgUrl)
        }
      }

    
      render() {    
        return (
          <section>
            <span className="icon camera"></span>
             <input 
                ref="upload" 
                type="file" 
                onChange={this._handleImageChange} 
                className={Style['upload-image']}/>
          </section>
        )
      }
}
DefaultUpload.defaultProps = {
  successCb: () => {}
}
export default DefaultUpload
