import { useQuery } from "@tanstack/react-query";
import Title from "../../../components/Title/Title";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { FaDollarSign, FaList, FaUsers } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend, Tooltip, Brush, Area, Customized, ReferenceDot } from 'recharts';



const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const AdminHome = () => {
    const {user} = useAuth()
    const axiosSecure = useAxios()


    const {data: stats={} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/admin-stats')
            return res.data 
        }
    })

    // load chart data 
    const {data: chartData = []} = useQuery({
        queryKey:['order-stats'],
        queryFn: async() =>{
            const res = await axiosSecure.get('/order-stats')
            return res.data
        }
    })
    // console.log(chartData)

    // custom shape for the bar chart 
    
        const getPath = (x, y, width, height) => {
            return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
            ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
            Z`;
        };
        
        const TriangleBar = (props) => {
            const { fill, x, y, width, height } = props;
        
            return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
        };

        // custom function for piechart 
        const RADIAN = Math.PI / 180;
            const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
            };

            const pieChartData = chartData.map(data => {
                return {name: data.category, value: data.revenue}
            })

        

    return (
        <div className="px-8">
            <Title title={'admin '} subtitle={"admin profile"}></Title>
        <div className="flex justify-evenly ">
        <h1 className="text-2xl font-semibold text-green-400">Hi {user?.displayName} <span className="text-xl">Welcome Back</span> </h1> 

            <div className="stat max-w-max rounded-xl shadow-xl  bg-white">
            <div className="stat-figure text-secondary">
            <div className="avatar online">
                <div className="w-16 rounded-full">
                <img src={user?.photoURL} className="" />
                </div>
            </div>
            </div>
            <div className="text-xl font-bold">{user?.displayName}</div>
            <div className="stat-title">{user?.email}</div>
            <div className="stat-desc text-secondary"> Admin</div>
        </div>
        </div>

            <div>
            <div className="stats flex flex-col-reverse md:flex-row mt-10 shadow-lg">
  
                    <div className="stat bg-blue-200">
                        <div className="stat-figure text-primary">
                        <FaDollarSign className="text-3xl font-bold"></FaDollarSign>
                        </div>
                        <div className="stat-title text-2xl font-semibold">Revenue</div>
                        <div className="stat-value text-primary"> ${stats?.revenue}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                    <div className="stat bg-rose-200">
                        <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl font-bold"></FaUsers>
                        </div>
                        <div className="stat-title text-2xl font-semibold">All Users </div>
                        <div className="stat-value text-secondary">{stats?.users}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat bg-orange-200">
                        <div className="stat-figure text-secondary">
                        <FaList className="text-3xl font-bold"></FaList>
                        </div>
                        <div className="stat-title text-2xl font-semibold">Orders </div>
                        <div className="stat-value text-secondary">{stats?.orders}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                    
                   
                    
                    </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold mt-10 ">Orders Chart</h1>

                {/* barChart  */}
                <div className="flex justify-center items-center border-2 mt-10">
                    <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                                </Bar>
                                <Legend></Legend>
                                <Tooltip />
                                </BarChart>
                    </div>
                    <div className="w-1/2 ">
                    <PieChart width={400} height={400}>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend></Legend>
                                <Tooltip />
                                </PieChart>
                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default AdminHome;