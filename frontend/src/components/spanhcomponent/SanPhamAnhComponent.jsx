import React, {Component} from 'react';
import sanPhamAnhService from "../../services/sanphamanhservice/sanPhamAnhService";
import SanPhamChiTietService from "../../services/spctservice/SanPhamChiTietService";

class SanPhamAnhComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idSP:this.props.match.params.id,
            sanPham : [],
            sanPhamAnh :[],
            filesAdd:[],
        }
    }

    componentDidMount() {
        sanPhamAnhService.getAllSPCoAnh().then((res)=>{
            this.setState({sanPham : res.data});
        })
        const id = this.props.match.params.id;
        if (id) {
            sanPhamAnhService.getDetail(id).then((res)=>{
                this.setState({sanPhamAnh:res.data});
            })
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default SanPhamAnhComponent;