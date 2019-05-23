import React from 'react';
import Style from './index.scss'
import API from '@common/api.js'

class DefaultUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          file: '',
          imagePreviewUrl: ''
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
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
        const values = e.target.files[0];
        let response = await API.getToken(values);
      }
    
      render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        let $defaultPreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        }

        if (!imagePreviewUrl) {
            $imagePreview = (<span className="icon camera"></span>);
        }
    
        return (
          <section>
            {$defaultPreview}
             <input type="file" onChange={this._handleImageChange} className={Style['upload-image']}/>
            {$imagePreview}
          </section>
        )
      }
}
export default DefaultUpload
