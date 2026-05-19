import { motion } from 'motion/react';
import { MapPin, Trees as Tree, Waves } from 'lucide-react';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-background"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <img 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGE5ZO1EGdxr6rS0kx9cl1czTpX9WZUaH9jBEaJ3YAKIjCz4WyLLmGKo9dYv-yBHOj6cRIeBFSofp3KufcoYy0NiBpb3uReFeWh-hdeqbz0X7dlpBzjGxYJMvFY-K78M1oJl438n2EMREWNYqiPFUV1Y_r9sj74w-OI00U06RX5bCfB1tH7oNX1iRZaQxioaoMZIQGHCNn4vLyNyqiTZAyv3FKNtoLYH6StdpVE5XVd2GW3eTmXYOl992oAB1od4jprPHMlFZULM8"
          alt="Sarawak Mist"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-margin-mobile md:p-margin-desktop max-w-container-max mx-auto mb-24">
          <h1 className="text-white text-display-lg-mobile md:text-display-lg mb-4">The Land of the Hornbills</h1>
          <p className="text-white/90 text-body-lg max-w-2xl">
            Discover Sarawak: A kaleidoscope of ancient rainforests, vibrant indigenous cultures, and a culinary heritage that spans generations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          <div className="md:col-span-5 order-2 md:order-1 relative">
            <img 
              className="rounded-xl shadow-2xl w-full h-[600px] object-cover transition-transform hover:scale-[1.02] duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA00-Xep7MUwat_vxEUhPwLhT7MHBf487XhS75aJPqtNv_0ogmvt1Z2uVMmCwS6fIp9i57nsjX9XfoFdm-5YRM8Q6Uy1-vjZHw7bmz1Lmnbj-ttzL9TVJ6Uu9K2OspIh6D9DXaFi4w7DzshRVdhOGSzrTeoeXooRqwX6GIDqZf5DMXSyd8MeJdG84POu2Mt5lQ_pvcS_zI0GOSNVcklbjP2vxc7-1xF6sPPoUbVphL8mW4naf6Yo8v957pixK154YG-ChK8FNFi0aI"
              alt="Traditional Longhouse"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-container rounded-full -z-10 opacity-20 blur-2xl"></div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 space-y-10">
            <div className="space-y-4">
              <div className="inline-block px-4 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-md uppercase tracking-wider font-bold">
                Our Story
              </div>
              <h2 className="text-display-sm md:text-display-md text-primary leading-tight">A World within a World</h2>
            </div>
            <div className="space-y-6">
              <p className="text-on-surface-variant text-body-lg leading-relaxed font-sans border-l-4 border-primary/20 pl-6">
                Sarawak is Malaysia's largest state, located on the northwest coast of Borneo. It is a land of immense beauty and legendary hospitality. For centuries, the mighty Rajang River has been the lifeblood of this territory, carving paths through primary jungles that house species found nowhere else on earth.
              </p>
              <p className="text-on-surface-variant text-body-lg leading-relaxed font-sans pl-7">
                Beyond the flora and fauna, Sarawak is a tapestry of over 30 ethnic groups. From the coastal Malay communities to the upriver Iban, Bidayuh, and Orang Ulu tribes, every face tells a story of harmony and resilience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Soul of Borneo Bento */}
      <section className="bg-surface-container-low py-24">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline-lg text-primary mb-4">Experience the Soul of Borneo</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              From the rhythmic beats of the Sape to the spicy aroma of Laksa, immerse yourself in the authentic Sarawakian way of life.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-gutter h-auto md:h-[800px]">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl bg-primary">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALb9qwBaIGbZturhQtRqpl8lvVVNsrC_uYqWPdp1EXIyvs8GERzxOPytvjT4C_CiFjn3QpIcm6OjYABLcEjOD6ng4_U_bO0louYB5oqdWWxnfzkGw57EIvMb3GwfESWkPy1sMNImsijQ9TZIsLdRBJLAYYtCuqeqnYbMJJndL4y6On-RDY83ZTXrshw5jc8p56xq9CIAO0grsAcbRsNkRbuh9mtgzxrj6HyOSsOLrHl7twx2SyVCjx5vx_gSmffXerPK_T3CEcrBQ"
                alt="Culture"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-headline-md mb-2">Culture & Heritage</h3>
                <p className="text-white/80 mb-6">Discover the ancient traditions of the Dayak people and the colonial history of the White Rajahs.</p>
                <button className="bg-white text-primary px-6 py-2 rounded-lg font-bold text-label-md hover:bg-primary-fixed transition-colors shadow-lg">
                  Explore Culture
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl bg-secondary">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPd53yK69OTVg9fxXdGRXRGV1XCj8ngcj00EVYxdgrUADiCdaaqCsw6c_o5pZX6rPpDDH6B3H3Kuug1HSl3rHZhdCx4VLDFxB19w2Dbi1NNCkhTqxLuUj5He2PaZUm89QLkQbEGLQ2DnXq1180uoY6JW_uabJnr-fUarkSucn9CAFY3Wspi4rWuiOA1ujIRETUT7KjzDH5vzH-QFsMpgaG8sqD69eaTODqBvhuLPfvX--dfqC5AFY7fhPa1PXO2VY_JlcJcxmPdHY"
                alt="Nature"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-headline-md mb-2">Nature & Wildlife</h3>
                <p className="text-white/80">Home to the majestic Orangutan and the world's largest flower, the Rafflesia.</p>
              </div>
            </div>
            <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-xl bg-tertiary">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiKmQl7B9BfrYokYLaczWQSADcIGDwgRIvEy_5k1uFOM2qHDLqeYY5_xz9UyAw2k4qHAw6g2QRtRWOI_fwQkCzJwi5jLeuIm44BN0StgZszBVX5sgVkP3RQyeg_f0Wb8Qd9p17scvGJedRkKJeI49sdUfs8lhwSVrwxbbTJemZG-iTKQP66lspEqCauzF-9zZXjPy0tCT-NNBiNNHBIi5Y_bCYsubgMHppVbWg73PAQo15b0BXhV3ttMmVyvrbap0kDNWM6SMhQSk"
                alt="Culinary"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary via-tertiary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-headline-md mb-2">Culinary Journey</h3>
                <p className="text-white/80">Savor the complex flavors of Sarawak Laksa and Manok Pansoh.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Regions */}
      <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="bg-primary rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl">
          <div className="md:w-1/2 p-12 text-on-primary space-y-6">
            <h2 className="text-headline-lg">Explore the Regions</h2>
            <p className="opacity-90 font-sans">
              Sarawak is divided into several administrative divisions, each offering a unique slice of the Bornean experience.
            </p>
            <div className="space-y-4">
              {[
                { name: 'Southern Region (Kuching)', desc: 'City of Cats, Museums, and Bako National Park.', icon: <MapPin size={20} /> },
                { name: 'Central Region (Sibu)', desc: 'Heart of the Rajang River and Iban Longhouses.', icon: <Tree size={20} /> },
                { name: 'Northern Region (Miri)', desc: 'Mulu Caves (UNESCO) and Highlands.', icon: <Waves size={20} /> },
              ].map((region) => (
                <div key={region.name} className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors cursor-pointer group">
                  <div className="text-primary-fixed group-hover:scale-110 transition-transform">
                    {region.icon}
                  </div>
                  <div>
                    <div className="font-bold">{region.name}</div>
                    <div className="text-sm opacity-80 font-sans">{region.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative min-h-[400px]">
            <img 
              className="absolute inset-0 w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO1hzpTrzCZG0zHn57Tq9NfhR6zCSnZN5-Ys8Uo5YEiIyfbu3HjwJ3CAfdm8ZMTzgc7cX5LF_DWSdqZVIDMjybinHCTXQphbsUqhu7Bnn7sXsKGphQzy_gutz5ppI-inyupPlxuGon7NGS_TZvWCAUDsVXDuHLmbEH5UBfdEWv0e6cb6znVZVVVuFD4arkb_r4BBEVqn8AQ4KiQOeKsh23iGI-fMHC4bmFaM7iuO6AkjfxHI5LxYrS9aOYezAUHaMA133VF3-kQCk"
              alt="Sarawak Map Map"
            />
          </div>
        </div>
      </section>

      {/* Ancient Echoes */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
            <div className="md:col-span-4 space-y-8">
              <div className="sticky top-32">
                <h2 className="text-display-sm text-primary mb-6">Ancient Echoes</h2>
                <p className="text-on-surface-variant text-body-lg mb-8 font-sans leading-relaxed">
                  The Gunung Mulu National Park is a UNESCO World Heritage site known for its dramatic limestone karst formations and colossal cave systems. 
                </p>
                <div className="flex items-center gap-2 text-secondary font-bold font-sans">
                  <Tree size={20} className="fill-secondary/20" />
                  <span>Sustainable Tourism Partner</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-8 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 group">
                <img 
                  className="rounded-2xl w-full h-[700px] object-cover shadow-xl group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTkIc9MdGA9HOI6P1LZc4D_YgDiIkSKEJzXVY3mZWGmWBl3SXdhUMnQ19p9-zh6YyYlPgah_ZN0NG2m2a2CMea7MNMRcqKll8K723f_hmu9LmTFEbyzooBZTAR49MXXaIgKLf-uiptP5BMCoEsuagqIINstis10yYADDaZCJHFiBBi4wrbrA5jfxz7wZmF-g9KsAub1cznBJpdoQRdfEHZoleMeUBtkbx56deQEM4uy8NfKYgXFWGmHzosagx1kJSf4SscdETVxoY" 
                  alt="Pinnacles"
                />
              </div>
              <div className="w-full md:w-1/2 group">
                <img 
                  className="rounded-2xl w-full h-[700px] object-cover shadow-xl mt-0 md:mt-24 group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKrElfNxumX2Iz1jW6Rtn1_3srN-2DQoQ00ySMGOYPHqJAWmd-0iZ4J0Cbi5h-O77uRQu6CwDVeqm5ibRtXLcEfpnxTjdObt7sNsdD5WPTS2e_GOjONVobIfvoWTLud41q70EKsvQZ87Q09yGgoChvbalL7gCZXjjyLYeEff09s1jXA4N90E1IDcYFTKTeX4UtlfkTeYJPkOCTUd9GyAEAIF95QkSZwVt_yNtARKVoblZcrq0rWOzVsvS2Ns7cHShTP49R_znX6pk"
                  alt="Waterfall"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
