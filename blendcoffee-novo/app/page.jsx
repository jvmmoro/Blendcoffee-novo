
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Settings } from "lucide-react"

export default function SimuladorLucroCafe() {
  const [cliente, setCliente] = useState("NESTLE ARARAS")
  const [precoCompra, setPrecoCompra] = useState(1550)
  const [precoVenda, setPrecoVenda] = useState(1750)
  const [freteIndustria, setFreteIndustria] = useState(25.6)
  const [freteMato, setFreteMato] = useState(7)
  const [taxaJuros, setTaxaJuros] = useState(0.0004)
  const [diasJuros, setDiasJuros] = useState(90)
  const [comissao, setComissao] = useState(0.004)
  const [certificacao, setCertificacao] = useState(6)
  const [resultado, setResultado] = useState(null)

  const simular = () => {
    const funrural = precoCompra * 0.015
    let juros = 0
    if (cliente === "NESTLE ARARAS") {
      juros = (precoVenda / 0.88) * (taxaJuros * diasJuros)
    } else {
      juros = precoCompra * (0.000526 * (cliente === "JDE SALVADOR" ? 21 : 30))
    }

    const comissaoFinal = cliente === "NESTLE ARARAS" ? precoVenda * comissao : 0
    const certificacaoFinal = cliente === "NESTLE ARARAS" ? certificacao : 0
    const freteIndFinal = cliente === "JDE SALVADOR" ? 21 : cliente === "COCAM" ? 27 : freteIndustria

    const custoTotal = precoCompra + freteIndFinal + freteMato + funrural + juros + comissaoFinal + certificacaoFinal
    const lucro = precoVenda - custoTotal

    setResultado({
      custoTotal: custoTotal.toFixed(2),
      lucro: lucro.toFixed(2),
      composicao: {
        precoCompra: precoCompra.toFixed(2),
        freteIndustria: freteIndFinal.toFixed(2),
        freteMato: freteMato.toFixed(2),
        funrural: funrural.toFixed(2),
        juros: juros.toFixed(2),
        comissao: comissaoFinal.toFixed(2),
        certificacao: certificacaoFinal.toFixed(2)
      }
    })
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Cliente</Label>
              <Select value={cliente} onValueChange={setCliente}>
                <SelectTrigger>{cliente}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="NESTLE ARARAS">NESTLE ARARAS</SelectItem>
                  <SelectItem value="JDE SALVADOR">JDE SALVADOR</SelectItem>
                  <SelectItem value="COCAM">COCAM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="space-y-4">
                <DialogTitle>Configurações de Custo</DialogTitle>
                <div><Label>Frete para Indústria (R$)</Label><Input type="number" value={freteIndustria} onChange={(e) => setFreteIndustria(parseFloat(e.target.value))} /></div>
                <div><Label>Frete do Mato (R$)</Label><Input type="number" value={freteMato} onChange={(e) => setFreteMato(parseFloat(e.target.value))} /></div>
                <div><Label>Taxa de Juros (% a.d.)</Label><Input type="number" step="0.0001" value={taxaJuros} onChange={(e) => setTaxaJuros(parseFloat(e.target.value))} /></div>
                <div><Label>Dias de Juros</Label><Input type="number" value={diasJuros} onChange={(e) => setDiasJuros(parseInt(e.target.value))} /></div>
                <div><Label>Comissão (% sobre venda)</Label><Input type="number" step="0.0001" value={comissao} onChange={(e) => setComissao(parseFloat(e.target.value))} /></div>
                <div><Label>Certificação (R$)</Label><Input type="number" value={certificacao} onChange={(e) => setCertificacao(parseFloat(e.target.value))} /></div>
              </DialogContent>
            </Dialog>
          </div>
          <div><Label>Preço de Compra (R$)</Label><Input type="number" value={precoCompra} onChange={(e) => setPrecoCompra(parseFloat(e.target.value))} /></div>
          <div><Label>Preço de Venda (R$)</Label><Input type="number" value={precoVenda} onChange={(e) => setPrecoVenda(parseFloat(e.target.value))} /></div>
          <Button onClick={simular}>Simular</Button>
          {resultado && (
            <div className="pt-4 space-y-2">
              <div><strong>Custo Total:</strong> R$ {resultado.custoTotal}</div>
              <div><strong>Lucro Estimado:</strong> R$ {resultado.lucro}</div>
              <div className="pt-2"><strong>Composição do Custo:</strong>
                <ul className="list-disc list-inside">
                  <li>Preço de Compra: R$ {resultado.composicao.precoCompra}</li>
                  <li>Frete para Indústria: R$ {resultado.composicao.freteIndustria}</li>
                  <li>Frete do Mato: R$ {resultado.composicao.freteMato}</li>
                  <li>FUNRURAL: R$ {resultado.composicao.funrural}</li>
                  <li>Juros: R$ {resultado.composicao.juros}</li>
                  <li>Comissão: R$ {resultado.composicao.comissao}</li>
                  <li>Certificação: R$ {resultado.composicao.certificacao}</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
